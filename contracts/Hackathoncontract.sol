pragma solidity ^0.4.19;

contract Hackathoncontract {

// store balances of bounty suppliers/providers
    address public owner;
    mapping (bytes32 => uint) public bounty_map;
    mapping (bytes32 => uint) public payout_map;
    mapping (bytes32 => uint) public minimum_rep_map;

    mapping (address => uint) public user_rep_map;
    mapping (address => mapping(bytes32 => bool)) has_used;

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
        payout_map[_hash] = _payout;
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

/*
    function claim_bounty_delayed(bytes32 _hash) public returns (bool success) {
        bounty_map[_hash] = safe_subtract(bounty_map[_hash], payout_map[_hash]);
        msg.sender.transfer(payout_map[_hash]);
        return true;
    }
    */

}