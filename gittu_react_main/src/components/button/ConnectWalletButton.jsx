import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { FiChevronDown } from "react-icons/fi";

const ConnectWalletButton = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  const { address: addressData, isConnected } = useAccount();

  const [walletAddress, setWalletAddress] = useState("");
  const [shortWalletAddress, setShortWalletAddress] = useState("");

  useEffect(() => {
    if (isConnected) {
      let first = addressData.slice(0, 4);
      let last = addressData.slice(-4);
      setWalletAddress(first + "..." + last);

      let first2 = addressData.slice(0, 2);
      let last2 = addressData.slice(-2);
      setShortWalletAddress(first2 + "..." + last2);
    }
  }, [isConnected, addressData]);

  return (
    <>
      {openConnectModal && (
        <Button
          className="connect-wallet-btn"
          variant={"connect"}
          onClick={openConnectModal}
        >
          Connect <span>Wallet</span>
        </Button>
      )}

      {openAccountModal && (
        <Button
          // walletAddress
          className="connect-wallet-btn"
          variant={"connect"}
          onClick={openAccountModal}
        >
          <span>{walletAddress}</span>
          <span className="short-address">{shortWalletAddress}</span>
          <FiChevronDown />
        </Button>
      )}
    </>
  );
};

export default ConnectWalletButton;
