package main;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hedera.sdk.account.HederaAccount;
import com.hedera.sdk.common.HederaDuration;
import com.hedera.sdk.common.HederaFileID;
import com.hedera.sdk.common.HederaKey.KeyType;
import com.hedera.sdk.common.HederaPrecheckResult;
import com.hedera.sdk.common.HederaTimeStamp;
import com.hedera.sdk.common.HederaTransactionAndQueryDefaults;
import com.hedera.sdk.common.HederaTransactionReceipt;
import com.hedera.sdk.common.HederaTransactionRecord;
import com.hedera.sdk.common.HederaTransactionStatus;
import com.hedera.sdk.common.Utilities;
import com.hedera.sdk.contract.HederaContract;
import com.hedera.sdk.cryptography.HederaCryptoKeyPair;
import com.hedera.sdk.file.HederaFile;
import com.hedera.sdk.transaction.HederaTransactionResult;
import com.hederahashgraph.api.proto.java.ContractCall;
import com.hederahashgraph.api.proto.java.ContractGetBytecode;
import com.hederahashgraph.api.proto.java.ContractGetInfo;

public final class DemoContract
{
	final static Logger logger = LoggerFactory.getLogger(DemoContract.class);

	public static HederaContract update(HederaContract contract, HederaTimeStamp expirationTime, HederaDuration autoRenewDuration) throws Exception
	{
		logger.info("");
		logger.info("CONTRACT UPDATE");
		logger.info("");

		// update the smart contract
		// smart contract update transaction
		HederaTransactionResult updateResult = contract.update(expirationTime, autoRenewDuration);
		// was it successful ?
		if (updateResult.getPrecheckResult() == HederaPrecheckResult.OK)
		{
			// yes, get a receipt for the transaction
			HederaTransactionReceipt receipt = Utilities.getReceipt(contract.hederaTransactionID, contract.txQueryDefaults.node);
			// was that successful ?
			if (receipt.transactionStatus == HederaTransactionStatus.SUCCESS)
			{
				// and print it out
				logger.info(String.format("===>Smart Contract update success"));
			}
			else
			{
				logger.info("Failed with transactionStatus:" + receipt.transactionStatus);
				return null;
			}
		}
		else
		{
			logger.info("getPrecheckResult not OK: " + updateResult.getPrecheckResult().name());
			return null;
		}
		return contract;
	}

	static final long gas = 5;

	public static HederaContract create(HederaContract contract, HederaFileID fileID, long initialBalance) throws Exception
	{
		return create(contract, fileID, initialBalance, new byte[0]);
	}

	public static HederaContract create(HederaContract contract, HederaFileID fileID, long initialBalance, byte[] constParams) throws Exception
	{
		// new contract
		long shardNum = 0;
		long realmNum = 0;
		byte[] constructorParameters = constParams;
		HederaDuration autoRenewPeriod = new HederaDuration(60, 10);

		//fee 100
		contract.txQueryDefaults.node.contractCreateTransactionFee = 100;
		contract.txQueryDefaults.generateRecord = false;
		contract.txQueryDefaults.node = Main.DEFAULT_DEST_NODE;

		logger.info("");
		logger.info("CONTRACT CREATE");
		logger.info("");

		// create the new contract
		// contract creation transaction
		HederaTransactionResult createResult = contract.create(0, 0, fileID, 0, gas, constructorParameters, autoRenewPeriod);
		// was it successful ?
		Thread.sleep(Main.DEFAULT_TIMEOUT);
		if (createResult.getPrecheckResult() == HederaPrecheckResult.OK)
		{
			Thread.sleep(Main.DEFAULT_TIMEOUT);
			// yes, get a receipt for the transaction
			HederaTransactionReceipt receipt = Utilities.getReceipt(contract.hederaTransactionID, contract.txQueryDefaults.node);
			// was that successful ?
			if (receipt.transactionStatus == HederaTransactionStatus.SUCCESS)
			{
				contract.contractNum = receipt.contractID.contractNum;
				// and print it out
				logger.info(String.format("===>Your new contract number is %d", contract.contractNum));
				HederaTransactionRecord record = new HederaTransactionRecord(contract.hederaTransactionID, contract.txQueryDefaults.node.contractGetRecordsQueryFee, contract.txQueryDefaults);
			}
			else
			{
				logger.info("Failed with transactionStatus:" + receipt.transactionStatus.toString());
				return null;
			}
		}
		else
		{
			logger.info("getPrecheckResult not OK: " + createResult.getPrecheckResult().name());
			return null;
		}
		return contract;
	}

	public static void main(String... arguments) throws Exception
	{

		try
		{
			// setup a set of defaults for query and transactions
			HederaTransactionAndQueryDefaults txQueryDefaults = new HederaTransactionAndQueryDefaults();
			txQueryDefaults = Main.defaultTXSettings();

			// create an account
			// new account object
			HederaAccount account = new HederaAccount();
			// setup transaction/query defaults (durations, etc...)
			account.txQueryDefaults = txQueryDefaults;
			account.setHederaAccountID(Main.DEFAULT_ACC_ID);
			account.txQueryDefaults.node = Main.DEFAULT_DEST_NODE;

			Thread.sleep(Main.DEFAULT_TIMEOUT);

			System.out.println("Account balance " + Main.getBalance(Main.DEFAULT_ACC_ID));

			Thread.sleep(Main.DEFAULT_TIMEOUT);

			if (account != null)
			{
				// the paying account is now the new account
				account.txQueryDefaults.payingAccountID = account.getHederaAccountID();

				// create a file
				// new file object
				HederaFile file = new HederaFile();
				// setup transaction/query defaults (durations, etc...)
				file.txQueryDefaults = txQueryDefaults;

				// get file contents
				InputStream is = new FileInputStream(new File("contracts/Hackathoncontract.bin"));
				ByteArrayOutputStream buffer = new ByteArrayOutputStream();
				int nRead;
				byte[] data = new byte[4096];
				while ((nRead = is.read(data, 0, data.length)) != -1)
				{
					buffer.write(data, 0, nRead);
				}

				buffer.flush();
				byte[] fileContents = buffer.toByteArray();

				System.out.println("BUFFER ARRAY " + new String(fileContents));

				// create a file with contents
				Thread.sleep(Main.DEFAULT_TIMEOUT);

				file = FileCreate.create(file, fileContents);

				// new contract object
				HederaContract contract = new HederaContract();
				// setup transaction/query defaults (durations, etc...)
				contract.txQueryDefaults = txQueryDefaults;
				contract.txQueryDefaults.payingAccountID = account.getHederaAccountID();
				contract.txQueryDefaults.node = Main.DEFAULT_DEST_NODE;

				Thread.sleep(Main.DEFAULT_TIMEOUT);
				// create a contract
				contract = create(contract, file.getFileID(), 0);
				//contract = create(contract, file.getFileID(), 1);
				if (contract != null)
				{
					// update the contract
					HederaDuration autoRenewDuration = new HederaDuration(10, 20);

					contract = update(contract, null, autoRenewDuration);

					if (contract != null)
					{
						getInfo(contract);
						getByteCode(contract);
						// call
						long amount = 0;
						byte[] functionParameters = new byte[0];

						call(contract, gas, amount, functionParameters);
					}
				}
			}
		} catch (Exception e)
		{
			e.printStackTrace();
		}
	}

	public static void call(HederaContract contract, long gas, long amount, byte[] functionParameters) throws Exception
	{
		final Logger logger = LoggerFactory.getLogger(ContractCall.class);
		logger.info("");
		logger.info("CONTRACT CALL");
		logger.info("");

		// call the smart contract
		// smart contract call transaction
		HederaTransactionResult callResult = contract.call(gas, amount, functionParameters);
		// was it successful ?
		if (callResult.getPrecheckResult() == HederaPrecheckResult.OK)
		{
			// yes, get a receipt for the transaction
			HederaTransactionReceipt receipt = Utilities.getReceipt(contract.hederaTransactionID, contract.txQueryDefaults.node);
			// was that successful ?
			if (receipt.transactionStatus == HederaTransactionStatus.SUCCESS)
			{
				// and print it out
				logger.info(String.format("===>Smart Contract call success"));
			}
			else
			{
				logger.info("Failed with transactionStatus:" + receipt.transactionStatus.toString());
			}
		}
	}

	public static void getByteCode(HederaContract contract) throws Exception
	{
		final Logger logger = LoggerFactory.getLogger(ContractGetBytecode.class);

		logger.info("");
		logger.info("CONTRACT GET BYTECODE");
		logger.info("");

		// run a get bytecode
		byte[] bytecode = contract.getByteCode();
		if (bytecode != null)
		{
			// it was successful, print it
			logger.info("===>Got bytecode=" + bytecode.toString());
		}
		else
		{
			// an error occurred
			logger.info("===>Getting bytecode - precheck ERROR");
			logger.info(contract.getPrecheckResult().toString());
		}
	}

	public static void getInfo(HederaContract contract) throws Exception
	{
		final Logger logger = LoggerFactory.getLogger(ContractGetInfo.class);

		logger.info("");
		logger.info("CONTRACT GET INFO");
		logger.info("");

		// get info for the contract
		if (contract.getInfo())
		{
			logger.info("===>Got info");
		}
		else
		{
			logger.info("===>Getting info - precheck ERROR " + contract.getPrecheckResult());
		}
	}
}