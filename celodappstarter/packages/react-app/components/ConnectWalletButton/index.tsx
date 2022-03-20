import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
              <Chip
                label={truncateAddress(address)}
                color="info"
                onDelete={destroy}
                sx={{mx:1}}
              />
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
              Connect wallet
            </Button>
          )}
      </div>
    </Box>
  );
}
