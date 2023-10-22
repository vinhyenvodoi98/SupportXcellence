import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import FundCard from '@/components/FundCard';
import Layout from '@/components/layout/Layout';

import { shortenAddress } from '@/utils/addresses';

export default function Profile() {
  const router = useRouter();
  const { address } = router.query;
  const tabs = ['Projects', 'Investments'];
  const funds = [1, 2, 3, 4];
  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <Layout>
      <div className='avatar py-8'>
        <div className='w-24 mask mask-hexagon'>
          <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
        </div>
        <h3 className='flex items-center m-4'>
          {address && shortenAddress(address as string)}
        </h3>
      </div>
      <div className='flex'>
        {tabs.map((tab, index) => (
          <h1
            key={index}
            className={`tab tab-lg tab-lifted ${
              currentTab === index && 'tab-active'
            }`}
            onClick={() => setCurrentTab(index)}
          >
            {tab}
          </h1>
        ))}
        <div className='border-b w-full'></div>
      </div>
      <div className='py-8 grid grid-cols-4 gap-4'>
        {currentTab === 0 ? (
          <div></div>
        ) : (
          funds.map((fund, index) => (
            <Link href={`/funds/${index}`} key={index}>
              <FundCard vaultAddress='0x' chainId={5} />
            </Link>
          ))
        )}
      </div>
    </Layout>
  );
}
