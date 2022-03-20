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
    uint256 orderCount = 0;

    event purchaseRegistered(OrderDetails _detail);
    event orderSigned(OrderDetails _detail);

    struct OrderDetails {
        uint256 orderID;
        uint256 productID;
        address customerAddress;
        address merchantAddress;
        uint256 orderAmount;
        uint expiryDate;
        string orderStatus; // Active Closed Refunded
    }

    mapping(uint256 => OrderDetails) public orderList;

    constructor(string memory merchantName) {
        // require(merchantName =! "", "Merchant name is blank");
        _merchantName = merchantName;
    }

    function addPurchase(uint256 payableAmount, uint256 productID) public payable nonReentrant {
        require(msg.value == payableAmount, "Payable is not valid!");
        OrderDetails memory orderDetails = OrderDetails(orderCount + 1, productID, msg.sender, address(this), payableAmount, 1, "Active"); //block timestamp not done
        orderCount++;
        orderList[orderCount] = orderDetails;
        emit purchaseRegistered(orderDetails);
    }

    function sign(uint256 orderID, bytes32 ordersHash) public {
        require(keccak256(bytes(orderList[orderID].orderStatus)) != keccak256(bytes("Closed")), "Customer has already received!");
        require(ordersHash == keccak256(abi.encode(orderList[orderID])), "Order details have changed!");
        orderList[orderID].orderStatus = "Closed";
        payout(orderList[orderID].customerAddress, orderList[orderID].orderAmount);
        emit orderSigned(orderList[orderID]);
    }

    function payout(address destination, uint256 payableAmount) public {
        ERC20(_CELO).transferFrom(address(this), destination, payableAmount);
    }

    function release(uint256 orderID) public returns (OrderDetails memory) {
        return orderList[orderID];
    }

    function refund(uint256 orderID) public returns (OrderDetails memory) {

    }

    function withdraw() public onlyOwner nonReentrant {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Withdraw failed!");
        
    }

    function balanceOf() public view returns (uint256){
        return address(this).balance;
    }
}