package main;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hedera.sdk.common.HederaFileID;
import com.hedera.sdk.common.HederaPrecheckResult;
import com.hedera.sdk.common.HederaTransactionReceipt;
import com.hedera.sdk.common.HederaTransactionStatus;
import com.hedera.sdk.common.Utilities;
import com.hedera.sdk.file.HederaFile;
import com.hedera.sdk.transaction.HederaTransactionResult;

public class FileCreate
{
	public static HederaFile uploadFile(String fileName)
	{
		try
		{
			BufferedReader br = new BufferedReader(new FileReader(fileName));

			String fileCon = "";
			String buffer = "";
			while ((buffer = br.readLine()) != null)
				fileCon += buffer;

			HederaFile hf = new HederaFile();
			hf.txQueryDefaults = Main.defaultTXSettings();

			return create(hf, fileCon);

		} catch (Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}

	public static void main(String... args) throws Exception
	{
		HederaFile result = uploadFile("contracts/Hackathoncontract.bin");

		System.out.println(result);

		Thread.sleep(1000);

		HederaFile file = new HederaFile();
		file.txQueryDefaults = Main.defaultTXSettings();

		file.setFileID(new HederaFileID(0, 0, result.fileNum));

		fileRead(file);
	}

	public static void fileRead(HederaFile file) throws Exception
	{
		final Logger logger = LoggerFactory.getLogger(FileCreate.class);

		logger.info("");
		logger.info("FILE GET CONTENTS");
		logger.info("");

		// run a get contents query
		byte[] contents = file.getContents();
		if (contents != null)
		{
			// it was successful, print it
			logger.info("===>Got contents=");
			logger.info(new String(contents, "UTF-8"));
		}
		else
		{
			// an error occurred
			logger.info("===>Getting contents - precheck ERROR" + file.getPrecheckResult());
		}
	}

	public static HederaFile create(HederaFile file, String str) throws Exception
	{
		byte[] contents = str.getBytes();

		final Logger logger = LoggerFactory.getLogger(FileCreate.class);
		// new file
		long shardNum = 0;
		long realmNum = 0;

		logger.info("");
		logger.info("FILE CREATE");
		logger.info("");

		int fileChunkSize = 3000;

		int position = fileChunkSize;

		byte[] fileChunk = Arrays.copyOfRange(contents, 0, Math.min(fileChunkSize, contents.length));
		logger.info("");
		logger.info("fileChunk:" + Math.min(fileChunkSize, contents.length));

		// create the new file
		// file creation transaction
		HederaTransactionResult createResult = file.create(shardNum, realmNum, fileChunk, null);
		// was it successful ?
		if (createResult.getPrecheckResult() == HederaPrecheckResult.OK)
		{
			// yes, get a receipt for the transaction
			HederaTransactionReceipt receipt = Utilities.getReceipt(file.hederaTransactionID, file.txQueryDefaults.node);
			// was that successful ?
			if (receipt.transactionStatus == HederaTransactionStatus.SUCCESS)
			{
				// yes, get the new account number from the receipt
				file.fileNum = receipt.fileID.fileNum;
				// and print it out
				logger.info("===>Your new file number is " + file.fileNum);

				while (position <= contents.length)
				{

					int toPosition = Math.min(position + fileChunkSize, contents.length + 1);
					byte[] appendChunk = Arrays.copyOfRange(contents, position, toPosition);

					logger.info("Appending remaining data");
					if (file.append(appendChunk) != null)
					{
						position += fileChunkSize;
					}
					else
					{
						System.err.println("Appending Failure");
						System.exit(0);
					}
				}
			}
			else
			{
				logger.info("Failed with transactionStatus:" + receipt.transactionStatus);
				return null;
			}
		}
		else
		{
			logger.info("Failed with getPrecheckResult:" + createResult.getPrecheckResult());
			return null;
		}
		return file;
	}

}
