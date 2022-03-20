import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { useContractKit } from "@celo-tools/use-contractkit";
import { truncateAddress, getWindowDimensions } from '@/utils'
import styles from './index.module.scss'

export default function ButtonAppBar() {
  const { address, network, connect, destroy } = useContractKit();
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className={styles.connectWallet}>
          {network && 
            <Chip 
              label={network.name} 
              color="secondary" 
              className={styles.network}
            />}
          {address && (
            <>
              {windowDimensions.width >= 600 ?
                <Button variant="outlined" color="inherit" onClick={destroy}>
                  Disconnect
                </Button>
              : ""}
            </>
          )}
          {!address && (
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => connect().catch((e) => console.log(e))}
            >
              Connect
            </Button>
          )}
      </div>
      <Box className={styles.address}>Wallet: {address || 'Please Connect Wallet'}</Box>
    </Box>
  );
}
