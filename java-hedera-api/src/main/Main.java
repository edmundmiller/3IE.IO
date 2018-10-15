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

	public static void main(String[] args) throws Exception
	{

		// node details
		String nodeAddress = "testnet38.hedera.com";
		int nodePort = 80;

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

		// setup defaults for transactions and Queries 
		HederaTransactionAndQueryDefaults txQueryDefaults = new HederaTransactionAndQueryDefaults();

		// default memo to attach to transactions
		txQueryDefaults.memo = "Hello Future";

		// setup the node we're communicating with from the properties loaded above
		txQueryDefaults.node = new HederaNode(nodeAddress, nodePort, new HederaAccountID(nodeAccountShard, nodeAccountRealm, nodeAccountNum));

		// setup the paying account ID (got from the properties loaded above)
		txQueryDefaults.payingAccountID = new HederaAccountID(payAccountShard, payAccountRealm, payAccountNum);

		// setup the paying key pair (got from properties loaded above)
		txQueryDefaults.payingKeyPair = new HederaCryptoKeyPair(KeyType.ED25519, pubKey, privKey);

		// define the valid duration for the transactions (seconds, nanos)
		txQueryDefaults.transactionValidDuration = new HederaDuration(120, 0);

		// instantiate a new account object
		HederaAccount myNewAccount = new HederaAccount();

		// set its default Transaction and Query parameters
		myNewAccount.txQueryDefaults = txQueryDefaults;

		// create a new key for my new account
		HederaCryptoKeyPair newAccountKey = new HederaCryptoKeyPair(KeyType.ED25519);

		// now, setup default for account creation 
		HederaAccountCreateDefaults defaults = new HederaAccountCreateDefaults();
		// auto renew period in seconds and nanos
		defaults.autoRenewPeriodSeconds = 86400;
		defaults.autoRenewPeriodNanos = 0;
		//			defaults.maxReceiveProxyFraction = 0;
		//			defaults.proxyFraction = 1;
		//			defaults.receiveRecordThreshold = Long.MAX_VALUE;
		//			defaults.receiverSignatureRequired = false;
		//			defaults.sendRecordThreshold = Long.MAX_VALUE;

		try
		{
			// send create account transaction
			long shardToCreateIn = 0;
			long realmToCreateIn = 0;
			long startingBalance = 10000;
			// let's create the account
			HederaTransactionResult createResult = myNewAccount.create(shardToCreateIn, realmToCreateIn, newAccountKey.getPublicKey(), newAccountKey.getKeyType(), startingBalance, defaults);

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

					Thread.sleep(1000);

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