import Link from 'next/link';

import FundCard from '@/components/FundCard';
import Layout from '@/components/layout/Layout';

import { useContract } from '@/contexts/Contract';

export default function HomePage() {
  const { VaultContractsGoerli, VaultContractsScroll, VaultContractsMantle } = useContract();
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
          <h1 className='tab tab-lg tab-lifted tab-active w-60'>Vaults Scroll</h1>
          <div className='border-b w-full'></div>
        </div>
        <div className='grid gap-8 p-8 glass rounded-e-lg rounded-bl-lg mb-4'>
          {VaultContractsScroll &&
            VaultContractsScroll.toReversed().map((funds: string) => (
              <Link href={`/funds/5/${funds}`} key={funds}>
                <FundCard vaultAddress={funds} />
              </Link>
            ))}
        </div>
        <div className='flex'>
          <h1 className='tab tab-lg tab-lifted tab-active w-60'>Vaults Mantle</h1>
          <div className='border-b w-full'></div>
        </div>
        <div className='grid gap-8 p-8 glass rounded-e-lg rounded-bl-lg mb-4'>
        {VaultContractsMantle &&
            VaultContractsMantle.toReversed().map((funds: string) => (
              <Link href={`/funds/5001/${funds}`} key={funds}>
                <FundCard vaultAddress={funds} />
              </Link>
            ))}
        </div>
        <div className='flex'>
          <h1 className='tab tab-lg tab-lifted tab-active w-60'>Vaults Goerli</h1>
          <div className='border-b w-full'></div>
        </div>
        <div className='grid gap-8 p-8 glass rounded-e-lg rounded-bl-lg'>
        {VaultContractsGoerli &&
            VaultContractsGoerli.toReversed().map((funds: string) => (
              <Link href={`/funds/534351/${funds}`} key={funds}>
                <FundCard vaultAddress={funds} />
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
}
