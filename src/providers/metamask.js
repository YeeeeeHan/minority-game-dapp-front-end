import React, { useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { InjectedConnector } from "@web3-react/injected-connector";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { mmGameContractAtom } from "@/store/store";
import contract from "../contracts/MinorityGame.json";
import { ethers } from "ethers";

export const injected = new InjectedConnector({
  supportedNetworks: [1, 3, 4, 5, 42],
});

export async function ConnectToMetamask(activate) {
  try {
    // If injected.isAuthorized() == true, populates the web3React hook
    // If injected.isAuthorized() == false, triggers the metamask approval pop up
    await activate(injected);
  } catch (error) {
    toast.error(`Error: ${error}`);
  }
}

export async function CheckConnector(c) {
  const chainId = await c.getChainId();
  console.log("CheckConnector", chainId);

  if (chainId !== "0x5") {
    console.log("HERERER");
    toast.error("Please set metamask network to Goerli");
  } else {
    toast.success("Successfully switched metamask network to Goerli");
  }
}

export function MetamaskProvider({ children }) {
  const { connector, activate, library, error, active } = useWeb3React();
  const [mmGameContract, setMmGameContract] = useAtom(mmGameContractAtom);

  useEffect(() => {
    (async () => {
      // injected.isAuthorized() will be true if the user has approved the dapp w metamask
      if (await injected.isAuthorized()) {
        await ConnectToMetamask(activate);
      }
    })();
  }, []);

  // Update global signer and gameContract whenever deps change
  useEffect(() => {
    (async () => {
      // Skip effect if library is not initialised
      if (library === undefined) {
        return;
      }
      const mmGameContract = await new ethers.Contract(
        process.env.NEXT_PUBLIC_GAME_CONTRACT,
        contract.abi,
        library.getSigner()
      );
      setMmGameContract(mmGameContract);
    })();
  }, [library, active]);

  useEffect(() => {
    (async () => {
      // Whenever accounts is changed
      if (window.ethereum) {
        console.log("#### window.ethereum");
        window.ethereum.on("accountsChanged", async function (accounts) {
          console.log("accountsChanged", connector, activate, library, active);
          toast.info(`Switched to ${accounts}`);
        });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // Whenever chainChanged
      if (window.ethereum) {
        console.log("#### window.ethereum");
        window.ethereum.on("chainChanged", async function () {
          console.log("chainChanged", connector, activate, library, active);
          if (connector) {
            await CheckConnector(connector);
          }
        });
      }
    })();
  });

  return children;
}
