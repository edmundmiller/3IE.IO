pragma solidity ^0.4.19;

contract Hackathoncontract {

// store balances of bounty suppliers/providers
    address public owner; //The 3IE.IO account
    bool public DEV_MODE = true; //Allows bounties to be claimed without rep requirement

    mapping (bytes32 => uint) public bounty_map;
    mapping (bytes32 => uint) public payout_map;
    mapping (bytes32 => uint) public minimum_rep_map;

    mapping (address => uint) public user_rep_map;
    mapping (address => mapping(bytes32 => bool)) has_used;

    mapping (address => uint) public escrowed_bounties;

    constructor() public {
        owner = msg.sender;
    }

    function safe_add(uint x, uint y) internal pure returns (uint z) {
        assert((x + y) > x);
        return (x + y);
    }

    function safe_subtract(uint x, uint y) internal pure returns (uint z) {
        assert ((x - y) >= 0 && (x - y) < x);
        return (x - y);
    }



    function create_bounty(bytes32 _hash, uint _payout, uint min_rep) public payable returns (bool success) {
        bounty_map[_hash] = safe_add(bounty_map[_hash], msg.value);
        payout_map[_hash] = safe_add(0, _payout);
        minimum_rep_map[_hash] = min_rep;
        return true;
    }

    function claim_bounty_immediate(bytes32 _hash) public returns (bool success) {
        assert(user_rep_map[msg.sender] >= minimum_rep_map[_hash]);
        assert(has_used[msg.sender][_hash] == false);
        has_used[msg.sender][_hash] == true;
        bounty_map[_hash] = safe_subtract(bounty_map[_hash], payout_map[_hash]);
        msg.sender.transfer(payout_map[_hash]);
        return true;
    }

    function claim_bounty_dev(bytes32 _hash) public returns (bool success) {
        assert(DEV_MODE);
        bounty_map[_hash] = safe_subtract(bounty_map[_hash], payout_map[_hash]);
        msg.sender.transfer(payout_map[_hash]);
        return true;
    }

    function release_escrowed(address _recipient, uint _amt) public returns (bool success) {
        assert(msg.sender == owner);
        assert(escrowed_bounties[_recipient] >= _amt);
        escrowed_bounties[_recipient] = safe_subtract(escrowed_bounties[_recipient], _amt);
        _recipient.transfer(_amt);
        return true;
    }

    function set_dev_mode(bool _mode) public returns (bool success) {
        require(msg.sender == owner);
        if(DEV_MODE) DEV_MODE = false;
        else {DEV_MODE = true;}
        return true;
    }
}
