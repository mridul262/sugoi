// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract QuboMerchant is Ownable, ReentrancyGuard {
    address _CELO = 0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9;
    bool _customerReceived = false;
    bool _merchantSent = false;
    string public _merchantName;

    //Order ID = FileHash
    mapping(uint256 => string) public orderList;
    //Order ID = Boolean
    mapping(uint256 => bool) public orderStatus;

    constructor(string memory merchantName) {
        // require(merchantName =! "", "Merchant name is blank");
        _merchantName = merchantName;
    }

    function addPurchase(uint256 payableAmount) public payable nonReentrant {
        require(msg.value == payableAmount, "Payable is not valid!");
    }
    
    function withdraw() public onlyOwner nonReentrant {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Withdraw failed.");
    }

    function balanceOf() public view returns (uint256){
        return address(this).balance;
    }
}