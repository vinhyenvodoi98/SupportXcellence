import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import Layout from '@/components/layout/Layout';

import { useContract } from '@/contexts/Contract';

import PoolManagerAbi from '../../../contract/out/PoolManager.sol/PoolManager.json';

export default function CreateProject() {
  const { createVault } = useContract();
  const [token0, settoken0] = useState('');
  const [token1, settoken1] = useState('');
  const [vaultTokenName, setVaultTokenName] = useState<string>('');
  const [vaultTokenSymbol, setVaultTokenSymbol] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<any>(null);

  // Read token
  // const { data: token } = useContractReads({
  //   contracts: [{
  //     address: tokenContract as `0x${string}`,
  //     abi: Erc20Abi.abi as any,
  //     functionName: 'name',
  //   },{
  //     address: tokenContract as `0x${string}`,
  //     abi: Erc20Abi.abi as any,
  //     functionName: 'symbol',
  //   },{
  //     address: tokenContract as `0x${string}`,
  //     abi: Erc20Abi.abi as any,
  //     functionName: 'decimals',
  //   }]
  // });

  const createFund = async () => {
    createPool?.();
  };

  const bigNumber: number = Math.sqrt(1) * 2 ** 96;
  // write contract
  const { config } = usePrepareContractWrite({
    abi: PoolManagerAbi.abi as any,
    address: '0xA449635FaAA6b5a45a568fCe217Bb7921c992285' as `0x${string}`,
    functionName: 'initialize',
    args: [
      {
        currency0: token0,
        currency1: token1,
        fee: 3000,
        tickSpacing: 60,
        hooks: '0x0000000000000000000000000000000000000000',
      },
      bigNumber.toString(),
      '0x',
    ],
  });

  const { write: createPool } = useContractWrite(config);

  return (
    <Layout>
      <div className='grid grid-cols-4 gap-8'>
        <div className='shadow-xl rounded-box border col-span-3 p-8 grid grid-cols-2 gap-4'>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Token 0</span>
            </label>
            <input
              onChange={(e) => settoken0(e.target.value)}
              type='text'
              placeholder='Type Token Address'
              className='input input-bordered w-full rounded-md'
            />
          </div>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Token 1</span>
            </label>
            <input
              onChange={(e) => settoken1(e.target.value)}
              type='text'
              placeholder='Type Token Address'
              className='input input-bordered w-full rounded-md'
            />
          </div>
        </div>
        <div className='shadow-xl rounded-box border col-span-1 p-8 max-h-72 sticky top-24'>
          <div className='grid grid-rows-3 gap-4'>
            <h1>Create New Vault</h1>
            <p>
              Creating a new vault is the initial step in establishing a secure
              and organized digital storage space
            </p>
            <button
              onClick={() => createFund()}
              className='btn btn-active btn-success'
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
