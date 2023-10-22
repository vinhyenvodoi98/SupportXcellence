import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { isAddress } from 'viem';
import { useChainId, useContractReads } from 'wagmi';

import Layout from '@/components/layout/Layout';

import { useContract } from '@/contexts/Contract';

import Erc20Abi from '../../../../contract/out/ERC20.sol/ERC20.json';
import Select from 'react-select';
import Image from 'next/image';

export default function CreateProject() {
  const { isVaultSuccess, isVaultLoading, createVault } = useContract();
  const [tokenContract, setTokenContract] = useState<string>('');
  const [vaultTokenName, setVaultTokenName] = useState<string>('');
  const [vaultTokenSymbol, setVaultTokenSymbol] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const chainId = useChainId();

  const options = [
    { value: '5', label: 'Goelri' },
    { value: '534351', label: 'Scroll Sepolia' },
    { value: '5001', label: 'Mantle Test' },
    { value: '420', label: 'Optimism Goerli' },
  ];

  const defaultOption = useMemo(
    () => options.filter((option) => option.value === chainId.toString())[0],
    [options, chainId]
  );

  // Read token
  const { data: token } = useContractReads({
    contracts: [
      {
        address: tokenContract as `0x${string}`,
        abi: Erc20Abi.abi as any,
        functionName: 'name',
        // chainId: 534351
      },
      {
        address: tokenContract as `0x${string}`,
        abi: Erc20Abi.abi as any,
        functionName: 'symbol',
        // chainId: 534351
      },
      {
        address: tokenContract as `0x${string}`,
        abi: Erc20Abi.abi as any,
        functionName: 'decimals',
        // chainId: 534351
      },
    ],
  });

  // useEffect(() => {
  //   if(isAddress(tokenContract)) fetchTokenInfo?.()
  // }, [tokenContract])

  const createFund = async () => {
    createVault({
      args: [tokenContract, vaultTokenName, vaultTokenSymbol],
    });
    await new Promise((r) => setTimeout(r, 1000));
    createVault?.();
  };

  const handleInput = (input: string) => {
    if (isAddress(input)) {
      setTokenContract(input);
    }
  };

  const isFetchSuccess = useMemo(() => {
    return token?.filter((token) => token.status === 'success').length === 3;
  }, [token]);

  useEffect(() => {
    if (isVaultSuccess)
      toast.success('Transaction has been created successfully');
  }, [isVaultSuccess]);

  useEffect(() => {
    if (isVaultLoading) toast.info('Transaction created');
  }, [isVaultLoading]);

  return (
    <Layout>
      <div className='grid grid-cols-4 gap-8'>
        <div className='shadow-xl rounded-box border col-span-3 p-8 grid grid-cols-2 gap-4 bg-base-100'>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Token Address</span>
            </label>
            <input
              onChange={(e) => handleInput(e.target.value)}
              type='text'
              placeholder='Type Token Address'
              className='input input-bordered w-full rounded-md z-10'
            />
          </div>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Select chain</span>
            </label>
            <Select
              styles={{
                input: (base) => ({
                  ...base,
                  'input:focus': {
                    boxShadow: 'none',
                  },
                }),
              }}
              classNames={{
                control: () => 'input input-bordered',
              }}
              value={defaultOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
          <div className='col-span-2'>
            {isFetchSuccess && token && (
              <div className='card w-full border rounded'>
                <div className='card-body'>
                  <div className='flex gap-2'>
                    <h2 className='card-title'>Token info</h2>
                    <Image
                      width={20}
                      height={20}
                      src='/svg/verify.svg'
                      alt='verify'
                    />
                  </div>
                  <p>Token Name: {token[0].result}</p>
                  <p>Token Symbol: {token[1].result}</p>
                  <p>Token Decimal: {token[2].result}</p>
                </div>
              </div>
            )}
          </div>
          <div className='col-span-2'>
            {isFetchSuccess && token && (
              <div>
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Vault Token Name</span>
                  </label>
                  <input
                    onChange={(e) => setVaultTokenName(e.target.value)}
                    type='text'
                    placeholder={`Vault ${token[0].result}`}
                    className='input input-bordered w-full rounded-md z-10'
                  />
                </div>
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Vault Token Symbol</span>
                  </label>
                  <input
                    onChange={(e) => setVaultTokenSymbol(e.target.value)}
                    type='text'
                    placeholder={`v${token[1].result}`}
                    className='input input-bordered w-full rounded-md z-10'
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='shadow-xl rounded-box border col-span-1 p-8 max-h-72 sticky top-24 bg-base-100'>
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
