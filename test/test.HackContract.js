const HackContract = artifacts.require('Hackathoncontract.sol')
var hash = require('hash.js')

contract('3IE.IO Contract', function(accounts) {
  let owner = accounts[0]
  let account1 = accounts[1]
  let account2 = accounts[2]
  let account3 = accounts[3]

  describe('deploy hackathon contract', async function() {
    beforeEach(async () => {
      contract = await HackContract.new({ from: owner })
    })

    it('contract should be deployed', async () => {
      assert.ok(contract, 'contract is not deployed')
    })

    it('deploying account should be owner', async () => {
      let contractOwner = await contract.owner()
      assert.equal(contractOwner, owner, 'deploying account is not owner')
    })

    it('create bounty', async () => {
      let bountyHash = hash
        .sha256()
        .update('bountycode')
        .digest('hex')
      let bountyContribution = 10000
      let bountyPayout = 100
      let bountyMinimumRep = 10
      //create_bounty(bytes32 hash, uint payout, uint minimum_rep) payable
      let creationSuccess = await contract.create_bounty(
        bountyHash,
        bountyPayout,
        bountyMinimumRep,
        { from: account1, value: bountyContribution }
      )
      let out_balance = await contract.bounty_map.call(bountyHash)
      let balance = out_balance.toNumber()
      let out_payout = await contract.payout_map.call(bountyHash)
      let payout = out_payout.toNumber()
      let out_minimumRep = await contract.minimum_rep_map.call(bountyHash)
      let minimumRep = out_minimumRep.toNumber()

      assert.ok(creationSuccess, 'create_bounty function returned false')
      assert.equal(
        balance,
        bountyContribution,
        "bounty balance doesn't match value sent"
      )
      assert.equal(
        payout,
        bountyPayout,
        "bounty payout doesn't match argument passed"
      )
      assert.equal(
        minimumRep,
        bountyMinimumRep,
        "bounty minimumRep doesn't match argument passed"
      )
    })
  })
})
