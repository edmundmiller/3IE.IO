package main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hedera.sdk.common.HederaDuration;
import com.hedera.sdk.common.HederaFileID;
import com.hedera.sdk.common.HederaPrecheckResult;
import com.hedera.sdk.common.HederaTransactionReceipt;
import com.hedera.sdk.common.HederaTransactionRecord;
import com.hedera.sdk.common.HederaTransactionStatus;
import com.hedera.sdk.common.Utilities;
import com.hedera.sdk.contract.HederaContract;
import com.hedera.sdk.file.HederaFile;
import com.hedera.sdk.transaction.HederaTransactionResult;

public final class Contract
{

	public static HederaContract create(HederaContract contract, HederaFileID fileID, long initialBalance) throws Exception
	{
		return create(contract, fileID, initialBalance, new byte[0]);
	}

	public static HederaContract create(HederaContract contract, HederaFileID fileID, long initialBalance, byte[] constParams) throws Exception
	{
		final Logger logger = LoggerFactory.getLogger(HederaContract.class);
		// new contract
		long shardNum = 0;
		long realmNum = 0;
		long gas = 0;
		HederaDuration autoRenewPeriod = new HederaDuration(60, 10);

		byte[] constructorParameters = constParams;

		contract.txQueryDefaults = Main.defaultTXSettings();
		contract.txQueryDefaults.node.contractCreateTransactionFee = 2000;
		contract.txQueryDefaults.generateRecord = true;

		logger.info("");
		logger.info("CONTRACT CREATE");
		logger.info("");

		System.out.printf("Accessing file at %d:%d:%d\n", fileID.shardNum, fileID.realmNum, fileID.fileNum);

		// create the new contract
		// contract creation transaction
		HederaTransactionResult createResult = contract.create(shardNum, realmNum, fileID, 0, gas, constructorParameters, autoRenewPeriod);
		// was it successful ?
		if (createResult.getPrecheckResult() == HederaPrecheckResult.OK)
		{
			Thread.sleep(1000);

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
	//
	//	public static void main(String... arguments) throws Exception
	//	{
	//
	//		// setup a set of defaults for query and transactions
	//		HederaTransactionAndQueryDefaults txQueryDefaults = new HederaTransactionAndQueryDefaults();
	//		txQueryDefaults = ExampleUtilities.getTxQueryDefaults();
	//
	//		// create an account
	//		// new account object
	//		HederaAccount account = new HederaAccount();
	//		// setup transaction/query defaults (durations, etc...)
	//		account.txQueryDefaults = txQueryDefaults;
	//
	//		// create an account
	//		HederaCryptoKeyPair newAccountKey = new HederaCryptoKeyPair(KeyType.ED25519);
	//		account = AccountCreate.create(account, newAccountKey, 550000000000l);
	//
	//		if (account != null)
	//		{
	//			// the paying account is now the new account
	//			txQueryDefaults.payingAccountID = account.getHederaAccountID();
	//			txQueryDefaults.payingKeyPair = newAccountKey;
	//			txQueryDefaults.fileWacl = newAccountKey;
	//
	//			// create a file
	//			// new file object
	//			HederaFile file = new HederaFile();
	//			// setup transaction/query defaults (durations, etc...)
	//			file.txQueryDefaults = txQueryDefaults;
	//
	//			// get file contents
	//			InputStream is = DemoContract.class.getResourceAsStream("/main/resources/simpleStorage.bin");
	//			ByteArrayOutputStream buffer = new ByteArrayOutputStream();
	//			int nRead;
	//			byte[] data = new byte[4096];
	//			while ((nRead = is.read(data, 0, data.length)) != -1)
	//			{
	//				buffer.write(data, 0, nRead);
	//			}
	//
	//			buffer.flush();
	//			byte[] fileContents = buffer.toByteArray();
	//
	//			// create a file with contents
	//			file = FileCreate.create(file, fileContents);
	//
	//			// new contract object
	//			HederaContract contract = new HederaContract();
	//			// setup transaction/query defaults (durations, etc...)
	//			contract.txQueryDefaults = txQueryDefaults;
	//
	//			// create a contract
	//			contract = ContractCreate.create(contract, file.getFileID(), 0);
	//			//contract = create(contract, file.getFileID(), 1);
	//			if (contract != null)
	//			{
	//				// update the contract
	//				HederaTimeStamp expirationTime = new HederaTimeStamp(100, 10);
	//				HederaDuration autoRenewDuration = new HederaDuration(10, 20);
	//
	//				contract = ContractUpdate.update(contract, expirationTime, autoRenewDuration);
	//
	//				if (contract != null)
	//				{
	//					// getinfo
	//					ContractGetInfo.getInfo(contract);
	//					// get bytecode
	//					ContractGetBytecode.getByteCode(contract);
	//					// call
	//					final String SC_SET_ABI = "{\"constant\":false,\"inputs\":[{\"name\":\"x\",\"type\":\"uint256\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}";
	//					long gas = 250000;
	//					long amount = 14;
	//					byte[] functionParameters = SoliditySupport.encodeSet(10, SC_SET_ABI);
	//
	//					ContractCall.call(contract, gas, amount, functionParameters);
	//					// call local
	//					String SC_GET_ABI = "{\"constant\":true,\"inputs\":[],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}";
	//
	//					byte[] function = SoliditySupport.encodeGetValue(SC_GET_ABI);
	//					long localGas = 250000;
	//					long maxResultSize = 5000;
	//					HederaContractFunctionResult functionResult = ContractRunLocal.runLocal(contract, localGas, maxResultSize, function);
	//					int decodeResult = SoliditySupport.decodeGetValueResult(functionResult.contractCallResult(), SC_GET_ABI);
	//					logger.info(String.format("===>Decoded functionResult= %d", decodeResult));
	//				}
	//			}
	//		}
	//	}

	public static void main(String[] args)
	{
		HederaFile fileResult = FileCreate.uploadFile("contracts/Hackathoncontract.bin");

		try
		{
			Thread.sleep(1000);
		} catch (InterruptedException e1)
		{
			e1.printStackTrace();
		}

		HederaContract contract = new HederaContract();

		try
		{
			HederaContract result = create(contract, fileResult.getFileID(), 10000);
		} catch (Exception e)
		{
			e.printStackTrace();
		}
	}
}