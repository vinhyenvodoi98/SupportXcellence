import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import {
  goerli,
  mantleTestnet,
  optimismGoerli,
  scrollSepolia,
} from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const { chains, publicClient } = configureChains(
  [
    ...(process.env.NODE_ENV === 'development'
      ? [scrollSepolia, mantleTestnet, optimismGoerli, goerli]
      : [scrollSepolia, mantleTestnet, optimismGoerli, goerli]),
  ],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === goerli.id)
          return {
            http: goerli.rpcUrls.public.http[0],
          };

        if (chain.id === scrollSepolia.id)
          return {
            http: scrollSepolia.rpcUrls.public.http[0],
          };

        if (chain.id === mantleTestnet.id)
          return {
            http: mantleTestnet.rpcUrls.public.http[0],
          };

        if (chain.id === optimismGoerli.id)
          return {
            http: optimismGoerli.rpcUrls.public.http[0],
          };

        return null;
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
  projectId: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains };
