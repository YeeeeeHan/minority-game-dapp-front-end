import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Header from "./components/Header";
// import SigninSide from "./components/Signin";
// import { ConnectWallet } from "./pages/ConnectWallet";
// import Homepage from "./pages/Homepage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Web3ReactProvider } from "@web3-react/core";
import { MetamaskProvider } from "@/providers/metamask";
import { Web3Provider } from "@ethersproject/providers";
import { useEffect, useState } from "react";
// import PrivateRoutes from "./pages/PrivateRoutes";
import { useAtom } from "jotai";
import { mmSignerAtom } from "@/store/store";
import dynamic from "next/dynamic";
import Header from "@/components/Header";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = ({ Component, pageProps }) => {
  // const [mmSigner, setMmSigner] = useAtom(mmSignerAtom);
  // const [adminAddr, setAdminAddr] = useState();
  //
  // useEffect(async () => {
  //   if (mmSigner === undefined) {
  //     return;
  //   }
  //   const addr = await mmSigner.getAddress();
  //   setAdminAddr(addr);
  // }, [mmSigner]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MetamaskProvider>
          <QueryClientProvider client={queryClient}>
            <Header />
            <Component {...pageProps} />)
          </QueryClientProvider>
        </MetamaskProvider>
      </Web3ReactProvider>
      <ToastContainer />
    </>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
