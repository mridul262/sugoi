# Compilation Instructions

## To compile the frontend
```bash
git clone git@github.com:mridul262/sugoi.git
cd Sugoi-Dashboard/
yarn
yarn start
```

## To deploy the smart contracts
```bash
cd celodappstarter/packages/hardhat
yarn
yarn deploy
```

**NOTE:** The backend and postgres database have been deployed on a heroku web app

## Gitbook API Reference
https://cuboid.gitbook.io/api-docs/




# Project Description

## What did you build?
Qubo acts as a payment gateway for b2b and p2p transactions. Our solution would come in the form of an API that merchants / sellers can use to integrate into their website. The user flow is as follows:

Customer purchases an item with cryptocurrency → payment goes to an escrow smart contract → If purchase terms are satisfied (delivered as promised) the payment then goes through to the merchant. Else the merchant and customer need to resolve the dispute and depending on the situation, the customer's payment will be refunded back to them.

## Why did you build it?
Cryptocurrency is growing at a CAGR of 12.8% from 2021 to 2030 with the LATokens research team, formed by Deutsche Bank and McKinsey alumni, outlining that total market capitalization of cryptocurrencies can reach $5 trillion by 2025. With such growing prevalence it is striking to observe that cryptocurrencies are primarily used to hold value rather than for day to day transaction. Businesses have solutions like paypal and stripe for fiat currencies, but there is a lack of similar solutions in the form of payment gateways and apis for cryptocurrencies.

Additionally, when payments are made in cryptocurrency, there is no way of reversing the transaction unless both parties agree to it. This is problematic in the case of ecommerce disputes where the buyer is unsatisfied with the purchase due to receipt of defective goods, non-delivery of goods or other factors. These are the problems that have motivated our solution: Qubo.

We also prioritised developer experience by having a comprehensive API documentation to make it easy for them to plug and play 

## How does it work (tech-stack)?
Our proof of concept uses a stack of React for frontend, flask for the middleware, postgres for the database and the celo blockchain(built on ethereum) for smart contracts which stores information related to customer-merchant transactions and acts as an escrow to store the transaction amount until the order is fulfilled by the merchant.

### So how will the merchant integrate our tool into their current workflow?
The merchant will need to enter some basic information, such as their name, contact information, wallet address and other basic details of their business. After that, we will deploy a smart contract for their business to accept crypto payments. Businesses can then integrate with the smart contract by simply importing our frontend library or build custom solution using our APIs.

## What did you learn?
This project was our first experience with building a web3 application utilising blockchain technologies. 

## What are the next steps?
Going ahead we intend to expand the breadth of our project. This will be done by improving the API, expanding the currencies accepted and implementing a full dispute resolution framework between merchants and customers.

