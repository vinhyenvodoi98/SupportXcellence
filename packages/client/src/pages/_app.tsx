import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
import '@/styles/colors.css';
import 'react-toastify/ReactToastify.min.css';

import Header from '@/components/layout/Header';
import Providers from '@/components/Providers';

import { ContractProvider } from '@/contexts/Contract';

import { useIsSsr } from '../utils/ssr';

function MyApp({ Component, pageProps }: AppProps) {
  const isSsr = useIsSsr();
  if (isSsr) {
    return <div></div>;
  }

  return (
    <Providers>
      <div className='
        w-full
        min-h-screen
        pb-8
        bg-gradient-to-r
        from-[#cad0ff]
        to-[#e3e3e3]
        background-animate'>
        <Header />
        <ContractProvider>
          <Component {...pageProps} />
        </ContractProvider>
        <ToastContainer position='bottom-right' newestOnTop />
      </div>
    </Providers>
  );
}

export default MyApp;
