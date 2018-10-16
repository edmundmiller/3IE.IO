package main;

import com.hedera.sdk.common.HederaAccountID;
import com.hedera.sdk.node.HederaNode;

public class Credential
{
	public final HederaNode destNode;
	public final HederaAccountID payerSource;
	public final String pubKey;
	public final String privKey;

	public Credential(String nodeAddress, int nodePort, HederaAccountID payingAccountID, HederaAccountID destNodeID, String pubKey, String privKey)
	{
		this.destNode = new HederaNode(nodeAddress, nodePort, destNodeID);
		this.payerSource = payingAccountID;
		this.pubKey = pubKey;
		this.privKey = privKey;
	}
}
