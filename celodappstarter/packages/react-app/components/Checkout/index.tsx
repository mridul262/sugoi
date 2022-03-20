import * as React from "react";
import { Box, Button, Divider, Grid, Typography, Link } from "@mui/material";

import { useInput } from "@/hooks/useInput";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useEffect, useState } from "react";
import { SnackbarAction, useSnackbar } from "notistack";
import { truncateAddress } from "@/utils";
import { Storage } from "../../../hardhat/types/Storage";
import { useQuery, gql } from "@apollo/client";
import styles from "./index.module.scss";
import ConnectWalletButton from '../ConnectWalletButton';
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


export default function Checkout({ contractData }) {
  const { kit, address, network, performActions } = useContractKit();
  const [balanceValue, setBalanceValue] = useState(0);
  const [storageValue, setStorageValue] = useState<string | null>(null);
  const [storageInput, setStorageInput] = useInput({ type: "text" });
  const [contractLink, setContractLink] = useState<string | null>(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  // Query the Graph endpoint specified in ../apollo-client.js 
  const { data: queryData, error: queryError } = useQuery(QUERY, {
    pollInterval: 2500,
  });
  console.log('The Graph query results', queryData);

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
    try {
      await performActions(async (kit) => {
        const gasLimit = await contract.methods
          .store(storageInput as string)
          .estimateGas();

        const result = await contract.methods
          .store(storageInput as string)
          //@ts-ignore
          .send({ from: address, gasLimit });

        console.log(result);

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

  const getStorage = async () => {
    try {
      const result = (await contract.methods.retrieve().call()) as string;
      setStorageValue(result);
    } catch (e) {
      console.log(e);
    }
  };

  const getBalance = async () => {
    try {
      const result = (await contract.methods.balanceOf().call()) as number;
      setBalanceValue(result);
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    if (contract) {
      getStorage();
      getBalance();
    }
  }, [contract]);
  
  return (
    <div className={styles.checkoutWrapper}>
        <h2>
          Connect Wallet
        </h2>
        <ConnectWalletButton/>
        <Divider component="div" sx={{ m: 1 }} />

        <h2>
          Write Contract
        </h2>
        <Box sx={{ m: 1, marginLeft: 0 }}>{setStorageInput}</Box>
        <Button sx={{ m: 1, marginLeft: 0 }} variant="contained" onClick={setStorage}>
          Update Storage Contract
        </Button>
        <Divider component="div" sx={{ m: 1 }} />

        <h2>
          Read Contract
        </h2>
        <Typography sx={{ m: 1, marginLeft: 0, wordWrap: "break-word" }} component="div">
          Storage Contract Value: {storageValue}
        </Typography>
        <Button sx={{ m: 1, marginLeft: 0 }} variant="contained" onClick={getStorage}>
          Read Storage Contract
        </Button>
    </div>
  );
}
