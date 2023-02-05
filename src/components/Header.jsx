import { FaSignInAlt, FaSignOutAlt, FaHome, FaCheck } from "react-icons/fa";
import KeepMountedModal from "./Modal";
import React from "react";
import Button from "@mui/material/Button";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";

function Header() {
  const { active } = useWeb3React();

  return (
    <nav>
      <div className="logo">
        <Link href="/">
          <Button color={"inherit"}>
            <FaHome /> <a>Home</a>
          </Button>
        </Link>
      </div>
      {active ? (
        <Link href="/connectwallet">
          <Button color={"inherit"}>
            <FaCheck /> <a>Wallet connected</a>
          </Button>
        </Link>
      ) : (
        <>
          <Link href="/connectwallet">
            <Button color={"inherit"}>
              <FaSignInAlt /> <a>Connect Wallet</a>
            </Button>
          </Link>
        </>
      )}
      <KeepMountedModal />
    </nav>
  );
}

export default Header;
