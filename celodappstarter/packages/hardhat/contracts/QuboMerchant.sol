// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract QuboMerchant is Ownable, ReentrancyGuard {
    address _CELO = 0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9;
    address public _merchantAddress;
    bool _customerReceived = false;
    bool _merchantSent = false;
    string public _merchantName;
    uint256 orderCount = 0;

    event purchaseRegistered(OrderDetails _detail);
    event orderSigned(OrderDetails _detail);
    event orderReleased(OrderDetails _detail);
    event orderRefunded(OrderDetails _detail);

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

    constructor(string memory merchantName, address merchantAddress) {
        require(bytes(merchantName).length != 0, "Merchant name is blank");
        _merchantName = merchantName;
        _merchantAddress = merchantAddress;
    }

    // Add purchase (Expires after 2 months)
    function addPurchase(uint256 payableAmount, uint256 productID) public payable nonReentrant {
        require(msg.value == payableAmount, "Payable is not valid!");
        OrderDetails memory orderDetails = OrderDetails(orderCount + 1, productID, msg.sender, _merchantAddress, payableAmount, block.timestamp + 60 seconds, "Active");
        orderCount++;
        orderList[orderCount] = orderDetails;
        emit purchaseRegistered(orderDetails);
    }

    // Customer signs the contract denoting order delivered
    function sign(uint256 orderID) public {
        require(keccak256(bytes(orderList[orderID].orderStatus)) != keccak256(bytes("Closed")), "Customer has already received!");
        require(orderList[orderID].customerAddress == msg.sender, "Order ID does not belong to user");
        orderList[orderID].orderStatus = "Closed";
        payout(orderList[orderID].customerAddress, orderList[orderID].orderAmount);
        emit orderSigned(orderList[orderID]);
    }

    // Release funds held after expiry
    function release(uint256 orderID) public onlyOwner nonReentrant {
        require(block.timestamp >= orderList[orderID].expiryDate);
        payout(msg.sender, orderList[orderID].orderAmount);
        orderList[orderID].orderStatus = "Closed";
        emit orderReleased(orderList[orderID]);
    }

    // Refund customer from incomplete order
    function refund(uint256 orderID) public onlyOwner nonReentrant {
        payout(orderList[orderID].customerAddress, orderList[orderID].orderAmount);
        orderList[orderID].orderStatus = "Refunded";
        emit orderRefunded(orderList[orderID]);
    }

    function payout(address destination, uint256 payableAmount) public {
        payable(destination).transfer(payableAmount);
    }

    function balanceOf() public view returns (uint256){
        return address(this).balance;
    }
}