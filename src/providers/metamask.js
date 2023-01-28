import React, { useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { InjectedConnector } from "@web3-react/injected-connector";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { mmGameContractAtom, mmSignerAtom } from "@/store/store";
import contract from "../contracts/MinorityGame.json";
import { ethers } from "ethers";

export const injected = new InjectedConnector({
  supportedNetworks: [1, 3, 4, 5, 42],
});

export async function ConnectToMetamask(activate) {
  try {
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

// If authorised, automatically log in
export function MetamaskProvider({ children }) {
  const { connector, activate, library, error, active } = useWeb3React();
  const [mmSigner, setMmSigner] = useAtom(mmSignerAtom);
  const [mmGameContract, setMmGameContract] = useAtom(mmGameContractAtom);

  useEffect(() => {
    (async () => {
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
      const mmSigner = await library.getSigner();
      const mmGameContract = await new ethers.Contract(
        process.env.NEXT_PUBLIC_GAME_CONTRACT,
        contract.abi,
        mmSigner
      );
      setMmGameContract(mmGameContract);
      console.log("MMSIGNER SET in metasmask.js[mmSigner]", mmSigner);
      console.log("MMSIGNER SET in metasmask.js[connector]", connector);
      console.log("MMSIGNER SET in metasmask.js[library]", library);
      setMmSigner(mmSigner);
    })();
  }, [library, active]);

  useEffect(() => {
    (async () => {
      // Whenever accounts or chain is changed
      if (window.ethereum) {
        console.log("#### window.ethereum");
        window.ethereum.on("accountsChanged", async function (accounts) {
          console.log("accountsChanged", connector, activate, library, active);
          toast.info(`Switched to ${accounts}`);
        });
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
