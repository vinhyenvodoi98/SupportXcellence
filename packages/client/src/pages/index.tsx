import Link from 'next/link';

import FundCard from '@/components/FundCard';
import Layout from '@/components/layout/Layout';

import { useContract } from '@/contexts/Contract';

export default function HomePage() {
  const {
    VaultContractsGoerli,
    VaultContractsScroll,
    VaultContractsMantle,
    VaultContractsOptimism,
  } = useContract();
  return (
    <Layout>
      <div className='pt-12'>
        <div className='form-control w-2/3 m-auto mb-8'>
          <input
            type='text'
            placeholder='Search'
            className='input input-bordered w-24 md:w-auto glass'
          />
        </div>
        <div className='flex'>
          <h1 className='tab tab-lg tab-lifted tab-active w-60'>
            Scroll Sepolia
          </h1>
          <div className='border-b w-full'></div>
        </div>
        <div className='grid gap-8 p-8 glass rounded-e-lg rounded-bl-lg mb-4'>
          {VaultContractsScroll &&
            VaultContractsScroll.toReversed().map((funds: string) => (
              <Link href={`/funds/5/${funds}`} key={funds}>
                <FundCard vaultAddress={funds} chainId={Number(5)} />
              </Link>
            ))}
        </div>
        <div className='flex'>
          <h1 className='tab tab-lg tab-lifted tab-active w-60'>
            Mantle Testnet
          </h1>
          <div className='border-b w-full'></div>
        </div>
        <div className='grid gap-8 p-8 glass rounded-e-lg rounded-bl-lg mb-4'>
          {VaultContractsMantle &&
            VaultContractsMantle.toReversed().map((funds: string) => (
              <Link href={`/funds/5001/${funds}`} key={funds}>
                <FundCard vaultAddress={funds} chainId={Number(5001)} />
              </Link>
            ))}
        </div>
        <div className='flex'>
          <h1 className='tab tab-lg tab-lifted tab-active w-60'>
            Optimism Goerli
          </h1>
          <div className='border-b w-full'></div>
        </div>
        <div className='grid gap-8 p-8 glass rounded-e-lg rounded-bl-lg mb-4'>
          {VaultContractsOptimism &&
            VaultContractsOptimism.toReversed().map((funds: string) => (
              <Link href={`/funds/420/${funds}`} key={funds}>
                <FundCard vaultAddress={funds} chainId={Number(420)} />
              </Link>
            ))}
        </div>
        <div className='flex'>
          <h1 className='tab tab-lg tab-lifted tab-active w-60'>Goerli</h1>
          <div className='border-b w-full'></div>
        </div>
        <div className='grid gap-8 p-8 glass rounded-e-lg rounded-bl-lg'>
          {VaultContractsGoerli &&
            VaultContractsGoerli.toReversed().map((funds: string) => (
              <Link href={`/funds/534351/${funds}`} key={funds}>
                <FundCard vaultAddress={funds} chainId={Number(534351)} />
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
}
