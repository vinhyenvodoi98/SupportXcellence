import { AppProps } from 'next/app';

import { ToastContainer } from "react-toastify";

import '@/styles/globals.css';
import '@/styles/colors.css';
import "react-toastify/ReactToastify.min.css";

import Header from '@/components/layout/Header';

import { useIsSsr } from '../utils/ssr';
import { ContractProvider } from '@/contexts/Contract';
import Providers from '@/components/Providers';

function MyApp({ Component, pageProps }: AppProps) {
  const isSsr = useIsSsr();
  if (isSsr) {
    return <div></div>;
  }

  return (
    <Providers>
      <Header />
      <ContractProvider>
        <Component {...pageProps} />
      </ContractProvider>
      <ToastContainer position="bottom-right" newestOnTop />
    </Providers>
  );
}

export default MyApp;
