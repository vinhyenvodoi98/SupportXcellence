import Link from 'next/link';

import FundCard from '@/components/FundCard';
import Layout from '@/components/layout/Layout';

import { useContract } from '@/contexts/Contract';

export default function HomePage() {
  const { VaultContracts } = useContract();
  const projects = [1, 2, 3, 4, 5, 6, 7, 8];
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
          <h1 className='tab tab-lg tab-lifted tab-active'>Vaults</h1>
          <div className='border-b w-full'></div>
        </div>
        <div className='grid gap-8 p-8 glass rounded-e-lg rounded-bl-lg'>
          {VaultContracts &&
            VaultContracts.toReversed().map((funds: string) => (
              <Link href={`/funds/${funds}`} key={funds}>
                <FundCard vaultAddress={funds} />
              </Link>
            ))}
        </div>
        {/* <div className='flex'>
          <h1 className='tab tab-lg tab-lifted tab-active'>Projects</h1>
          <div className='border-b w-full'></div>
        </div>
        <div className='grid grid-cols-3 gap-8 pt-8'>
          {projects.map((project, index) => (
            <Link href={`projects/${index}`} key={index}>
              <ProjectCard />
            </Link>
          ))}
        </div> */}
      </div>
    </Layout>
  );
}
