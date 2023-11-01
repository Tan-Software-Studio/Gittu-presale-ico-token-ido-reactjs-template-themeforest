import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  goerli,
  sepolia,
  polygon,
  optimism,
  arbitrum,
  bsc,
  bscTestnet,
  polygonMumbai,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [
    mainnet,
    goerli,
    sepolia,
    bsc,
    bscTestnet,
    polygon,
    polygonMumbai,
    optimism,
    arbitrum,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "c0f34d3c7165d3359ba08d31058682ce",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const Rainbowkit = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        modalSize="compact" //wide,compact
        chains={chains}
        theme={darkTheme({
          accentColor: "rgba(255, 255, 255, 0.2)",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Rainbowkit;
