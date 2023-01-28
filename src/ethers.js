import { ethers } from "ethers";
import contract from "./contracts/MinorityGame.json";
import { useAtom } from "jotai";
import { voterAddressAtom } from "./store/store";
import { toast } from "react-toastify";

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
