pragma solidity ^0.4.19;

// Uses token balances in place of ether/hbar to skirt the payable contract issue.

contract HackathoncontractNp {

// store balances of bounty suppliers/providers
    address public owner; //The 3IE.IO account
    bool public DEV_MODE = true; //Allows bounties to be claimed without rep requirement

    mapping (address => uint) public token_balance_map;
    mapping (bytes32 => uint) public bounty_map;
    mapping (bytes32 => uint) public payout_map;
    mapping (bytes32 => uint) public minimum_rep_map;

    mapping (address => uint) public user_rep_map;
    mapping (address => mapping(bytes32 => bool)) has_used;

    mapping (address => uint) public escrowed_bounties;

    constructor() public {
        owner = msg.sender;
        token_balance_map[owner] = 1000000;
    }

    function safe_add(uint x, uint y) internal pure returns (uint z) {
        assert((x + y) >= x);
        return (x + y);
    }

    function safe_subtract(uint x, uint y) internal pure returns (uint z) {
        assert ((x - y) >= 0 && (x - y) < x);
        return (x - y);
    }



// _totalpayout is the total amount of the bounty, _payout is PER interaction; so 100_000 _totalpayout for 1000 _payout 
// would yield 100 payouts of 1000 tokens
    function create_bounty(bytes32 _hash, uint _totalpayout, uint _payout, uint min_rep) public returns (bool success) {
        assert(token_balance_map[msg.sender] >= _totalpayout); 
        token_balance_map[msg.sender] = safe_subtract(token_balance_map[msg.sender], _totalpayout);
        bounty_map[_hash] = safe_add(bounty_map[_hash], _totalpayout);
        payout_map[_hash] = safe_add(0, _payout);
        minimum_rep_map[_hash] = min_rep;
        return true;
    }

    function claim_bounty_immediate(bytes32 _hash, address _claimant) public returns (bool success) {
        if(!DEV_MODE){
            assert(user_rep_map[_claimant] >= minimum_rep_map[_hash]);
            assert(has_used[_claimant][_hash] == false);
            has_used[_claimant][_hash] == true;
        }
        bounty_map[_hash] = safe_subtract(bounty_map[_hash], payout_map[_hash]);
        token_balance_map[msg.sender] = safe_add(payout_map[_hash], token_balance_map[msg.sender]);
        return true;
    }


    function set_dev_mode(bool _mode) public returns (bool success) {
        assert(msg.sender == owner);
        if(DEV_MODE) DEV_MODE = false;
        else {DEV_MODE = true;}
        return true;
    }
}
