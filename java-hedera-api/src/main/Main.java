package main;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import com.hedera.sdk.account.HederaAccount;
import com.hedera.sdk.account.HederaAccountCreateDefaults;
import com.hedera.sdk.common.HederaAccountID;
import com.hedera.sdk.common.HederaDuration;
import com.hedera.sdk.common.HederaKey.KeyType;
import com.hedera.sdk.common.HederaPrecheckResult;
import com.hedera.sdk.common.HederaTransactionAndQueryDefaults;
import com.hedera.sdk.common.HederaTransactionReceipt;
import com.hedera.sdk.common.HederaTransactionStatus;
import com.hedera.sdk.common.Utilities;
import com.hedera.sdk.cryptography.HederaCryptoKeyPair;
import com.hedera.sdk.node.HederaNode;
import com.hedera.sdk.transaction.HederaTransactionResult;

public final class Main
{
	public static final String nodeAddress = "testnet38.hedera.com";
	public static final int nodePort = 80;

	private static final HederaNode DEFAULT_DEST_NODE = new HederaNode(nodeAddress, nodePort, new HederaAccountID(0, 0, 3));
	private static final HederaDuration DEFAULT_DURATION = new HederaDuration(120, 0);
	private static final HederaAccountID DEFAULT_ACC_ID = new HederaAccountID(0, 0, 1004);

	public static final HederaCryptoKeyPair keyPair = initKeyPair();
	public static final int DEFAULT_TIMEOUT = 1000;

	public static HederaCryptoKeyPair initKeyPair()
	{
		try
		{
			return new HederaCryptoKeyPair(KeyType.ED25519, "302a300506032b65700321009c5c88eef8e3c2e00429e08a888c93b30f2b2717aef80b1286170299f622f380",
					"302e020100300506032b65700422042066baf4ec7aaad7ac1db12432ca2c26ff867d8f15e5a0b88c61a729d5ed9dd501");
		} catch (Exception e)
		{
			return null;
		}
	}

	public static HederaTransactionAndQueryDefaults defaultTXSettings()
	{
		return generateQueryDefaults("NA", DEFAULT_DEST_NODE, DEFAULT_ACC_ID, keyPair, DEFAULT_DURATION);
	}

	public static HederaTransactionAndQueryDefaults generateQueryDefaults(String memo, HederaNode destNode, HederaAccountID reqSourceID, HederaCryptoKeyPair reqSourceKeyPair,
			HederaDuration txValidTimeout)
	{
		HederaTransactionAndQueryDefaults querySettings = new HederaTransactionAndQueryDefaults();

		querySettings.memo = memo;
		querySettings.node = destNode;
		querySettings.payingAccountID = reqSourceID;
		querySettings.payingKeyPair = reqSourceKeyPair;
		querySettings.transactionValidDuration = txValidTimeout;

		return querySettings;
	}

	public static Credential loadProps(String propFileName)
	{
		// these are loaded from config.properties below
		long nodeAccountShard = 0;
		long nodeAccountRealm = 0;
		long nodeAccountNum = 0;
		// your account details
		long payAccountShard = 0;
		long payAccountRealm = 0;
		long payAccountNum = 0;
		// you public and private keys
		String pubKey = "";
		String privKey = "";

		// load application properties
		Properties applicationProperties = new Properties();
		InputStream propertiesInputStream = null;

		try
		{
			propertiesInputStream = new FileInputStream("node.properties");
			// load a properties file
			applicationProperties.load(propertiesInputStream);
			// get the node's account values
			nodeAccountShard = Long.parseLong(applicationProperties.getProperty("nodeAccountShard"));
			nodeAccountRealm = Long.parseLong(applicationProperties.getProperty("nodeAccountRealm"));
			nodeAccountNum = Long.parseLong(applicationProperties.getProperty("nodeAccountNum"));

			// get my public/private keys
			pubKey = applicationProperties.getProperty("pubkey");
			privKey = applicationProperties.getProperty("privkey");

			// get my account details
			payAccountShard = Long.parseLong(applicationProperties.getProperty("payingAccountShard"));
			payAccountRealm = Long.parseLong(applicationProperties.getProperty("payingAccountRealm"));
			payAccountNum = Long.parseLong(applicationProperties.getProperty("payingAccountNum"));

			HederaAccountID dest = new HederaAccountID(nodeAccountShard, nodeAccountRealm, nodeAccountNum);
			HederaAccountID src = new HederaAccountID(payAccountShard, payAccountRealm, payAccountNum);
			return new Credential(nodeAddress, nodePort, src, dest, pubKey, privKey);
		} catch (IOException ex)
		{
			ex.printStackTrace();
		} finally
		{
			if (propertiesInputStream != null)
			{
				try
				{
					propertiesInputStream.close();
				} catch (IOException e)
				{
					e.printStackTrace();
				}
			}
		}

		return null;
	}

	public static boolean send(HederaAccount source, HederaAccountID dest, final int amount)
	{
		try
		{
			source.send(dest, amount);
		} catch (Exception e)
		{
			System.out.println("Failed to send");
			return false;
		}

		return true;
	}

	public static HederaTransactionResult createAccount(HederaAccount estAcc, HederaCryptoKeyPair keyPair, long shardID, long realmID, long startingBalance)
	{
		try
		{
			HederaAccountCreateDefaults defaults = new HederaAccountCreateDefaults(); // now, setup default for account creation 

			// auto renew period in seconds and nanos
			defaults.autoRenewPeriodSeconds = 86400;
			defaults.autoRenewPeriodNanos = 0;

			HederaTransactionResult accCreateRes = estAcc.create(shardID, realmID, keyPair.getPublicKey(), keyPair.getKeyType(), startingBalance, defaults);

			return accCreateRes;
		} catch (Exception e)
		{
			System.out.println("Failed to create new account.");
			return null;
		}
	}

	public static HederaAccountID parseHederaAccountIDFromString(String address)
	{
		try
		{
			String[] pieces = address.split(":");

			long shard = Long.parseLong(pieces[0]);
			long realm = Long.parseLong(pieces[1]);
			long num = Long.parseLong(pieces[2]);

			return new HederaAccountID(shard, realm, num);

		} catch (Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}

	public static long getBalance(HederaAccountID accID) throws Exception
	{
		HederaNode destNode = DEFAULT_DEST_NODE;
		final String memo = "Query Balance";

		HederaTransactionAndQueryDefaults txDefaults = generateQueryDefaults(memo, destNode, accID, keyPair, DEFAULT_DURATION);

		HederaAccount acc = new HederaAccount();
		acc.setHederaAccountID(accID);
		acc.txQueryDefaults = txDefaults;

		return acc.getBalance();
	}

	public static void main(String[] args) throws Exception
	{
		Credential propLogin = loadProps("node.properties");

		HederaNode dest = propLogin.destNode;
		HederaAccountID src = propLogin.payerSource;

		HederaAccountID destID = dest.getAccountID();

		long nodeAccountShard = destID.shardNum;
		long nodeAccountRealm = destID.realmNum;
		long nodeAccountNum = destID.accountNum;
		// your account details
		long payAccountShard = src.shardNum;
		long payAccountRealm = src.realmNum;
		long payAccountNum = src.accountNum;
		// you public and private keys
		String pubKey = propLogin.pubKey;
		String privKey = propLogin.privKey;

		// setup defaults for transactions and Queries 
		HederaTransactionAndQueryDefaults txQueryDefaults = generateQueryDefaults("Test memo.", dest, src, new HederaCryptoKeyPair(KeyType.ED25519, pubKey, privKey), DEFAULT_DURATION);

		txQueryDefaults.payingKeyPair = new HederaCryptoKeyPair(KeyType.ED25519, pubKey, privKey); // setup the paying key pair (got from properties loaded above)
		txQueryDefaults.transactionValidDuration = new HederaDuration(120, 0); // define the valid duration for the transactions (seconds, nanos)

		HederaAccount myAccount = new HederaAccount(payAccountShard, payAccountRealm, payAccountNum);
		myAccount.txQueryDefaults.payingKeyPair = null;
		myAccount.txQueryDefaults = txQueryDefaults;
		myAccount.getBalance();

		Thread.sleep(DEFAULT_TIMEOUT);

		// instantiate a new account object
		HederaAccount myNewAccount = new HederaAccount();

		// set its default Transaction and Query parameters
		myNewAccount.txQueryDefaults = txQueryDefaults;

		// create a new key for my new account
		HederaCryptoKeyPair newAccountKey = new HederaCryptoKeyPair(KeyType.ED25519);

		try
		{
			// send create account transaction
			long shardToCreateIn = 0;
			long realmToCreateIn = 0;
			long startingBalance = 10000;
			// let's create the account
			HederaTransactionResult createResult = createAccount(myNewAccount, newAccountKey, shardToCreateIn, realmToCreateIn, startingBalance);

			// was it successful ?
			if (createResult.getPrecheckResult() == HederaPrecheckResult.OK)
			{
				// yes, get a receipt for the transaction
				HederaTransactionReceipt receipt = Utilities.getReceipt(myNewAccount.hederaTransactionID, myNewAccount.txQueryDefaults.node);

				// was that successful ?
				if (receipt.transactionStatus == HederaTransactionStatus.SUCCESS)
				{
					// yes, get the new account number from the receipt
					myNewAccount.accountNum = receipt.accountID.accountNum;
					// and print it out
					System.out.println(String.format("===>Your new account number is %d", myNewAccount.accountNum));

					// get balance
					myNewAccount.txQueryDefaults.payingAccountID = myNewAccount.getHederaAccountID();
					myNewAccount.txQueryDefaults.payingKeyPair = newAccountKey;

					myNewAccount.getBalance();

					HederaAccountID toAccountID = new HederaAccountID(nodeAccountShard, nodeAccountRealm, nodeAccountNum);
					myNewAccount.send(toAccountID, 20);

					Thread.sleep(DEFAULT_TIMEOUT);

					myNewAccount.getBalance();
				}
			}
			else
			{
				System.out.println("Creating result failed.");
			}
		} catch (InterruptedException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}