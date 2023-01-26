import { ethers } from "ethers";
import contract from "./contracts/MinorityGame.json";
import { useAtom } from "jotai";
import { voterAddressAtom } from "./store/store";
import { toast } from "react-toastify";

// // If metamask is installed, obtain metamask-injected signer
// export const EthersConnectWallet = async () => {
//   if (window.ethereum) {
//     const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
//     console.log('EthersConnectWallet web3Provider', web3Provider)
//     // await web3Provider.send('eth_requestAccounts', [])
//     const mmSigner = await web3Provider.getSigner()
//     const mmGameContract = await new ethers.Contract(
//       process.env.REACT_APP_GAME_CONTRACT,
//       contract.abi,
//       mmSigner
//     )
//     toast.success('Metamask connected!')
//     return { mmSigner, mmGameContract }
//   } else {
//     toast.error('Please Install Metamask!')
//   }
// }
console.log("@@@@@@@@", process.env.NEXT_PUBLIC_DEV_ALCHEMY, process.env.NEXT_PUBLIC_BACKEND_URL)
// Alchemy provider
const jsonRpcProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_DEV_ALCHEMY
);
export const alchemyGameContract = new ethers.Contract(
  process.env.NEXT_PUBLIC_GAME_CONTRACT,
  contract.abi,
  jsonRpcProvider
);

export default { alchemyGameContract };
