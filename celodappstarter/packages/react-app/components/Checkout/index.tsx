import * as React from "react";
import { Box, Button, Divider, Grid, Typography, Link } from "@mui/material";

import Web3 from "web3";
import { useInput } from "@/hooks/useInput";
import axios from "axios";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useEffect, useState } from "react";
import { SnackbarAction, useSnackbar } from "notistack";
import { hexNumberToInteger, truncateAddress } from "@/utils";
import { Storage } from "../../../hardhat/types/Storage";
import { useQuery, gql } from "@apollo/client";
import styles from "./index.module.scss";
import ConnectWalletButton from '../ConnectWalletButton';
import { integerToHexNumber } from "../../utils";
// The Graph query endpoint is defined in ../apollo-client.js

// Example GraphQL query for the Storage contract updates
const QUERY = gql`
  query Updates {
    updates(orderBy: timestamp, orderDirection: desc, first: 5) {
      id
      number
      sender
      timestamp
    }
  }
`;


export default function Checkout({ contractData, products }) {
  const { kit, address, network, performActions } = useContractKit();
  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  const [contractLink, setContractLink] = useState<string | null>(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const contract = contractData
    ? (new kit.web3.eth.Contract(
        contractData.abi,
        contractData.address
      ) as any as Storage)
    : null;

  useEffect(() => {
    if (contractData) {
      setContractLink(`${network.explorer}/address/${contractData.address}`);
    }
  }, [network, contractData]);

  const setStorage = async () => {
    const productId = 7;
    try {
      await performActions(async (kit) => {
        contract.once("purchaseRegistered", function(error, event) {
          const arrayReturnData = event.returnValues[0];
          let payload: any = {}
          payload['id'] = arrayReturnData['orderID'];
          payload['customer_addr'] = arrayReturnData['customerAddress'];
          payload['merchant_addr'] = arrayReturnData['merchantAddress'];
          payload['amount'] = hexNumberToInteger(arrayReturnData['orderAmount']);
          payload['status'] = arrayReturnData['orderStatus'];
          /* Get expire date to be yyyy-mm-dd HH:MM:ss format */
          const expireDate = new Date(arrayReturnData['expiryDate'] * 1000);
          const expireDateString = expireDate.toISOString().split('T')[0] + ' ' + expireDate.toTimeString().split(' ')[0];
          payload['expiry'] = expireDateString;
          // payload['expiry'] = new Date(parseInt(arrayReturnData['expiryDate']) * 1000).toISOString();
          payload['product_id'] = arrayReturnData['productID'];
          payload['currency_name'] = 'CELO'
          const url = 'https://cuboid-backend.herokuapp.com/customers/purchase';
          axios.post(url, payload);
        });

        const gasLimit = await contract.methods
          .addPurchase(integerToHexNumber(totalPrice), productId).estimateGas({
            from: address,
            value: integerToHexNumber(totalPrice)
          });
        const result = await contract.methods
          .addPurchase(integerToHexNumber(totalPrice), productId).send({
            from: address,
            gas: gasLimit,
            gasPrice: await kit.web3.eth.getGasPrice(),
            value: integerToHexNumber(totalPrice)
          });
        const variant = result.status == true ? "success" : "error";
        const url = `${network.explorer}/tx/${result.transactionHash}`;
        const action: SnackbarAction = (key) => (
          <>
            <Link href={url} target="_blank">
              View in Explorer
            </Link>
            <Button
              onClick={() => {
                closeSnackbar(key);
              }}
            >
              X
            </Button>
          </>
        );
        enqueueSnackbar("Transaction sent", {
          variant,
          action,
        });
      });
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' });
      console.log(e);
    }
  };

  return (
    <div className={styles.checkoutWrapper}>
        <h2>
          Connect Wallet
        </h2>
        <ConnectWalletButton/>
        <Divider component="div" sx={{ m: 1 }} />
        <Button 
          sx={{ m: 1, marginLeft: 0 }}
          variant="contained" 
          onClick={setStorage}
          className={styles.checkoutButton}
        >
          Pay
        </Button>
    </div>
  );
}
