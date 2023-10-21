import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useContractReads, useContractWrite } from 'wagmi';

import CountDown from '@/components/CountDown';
import Layout from '@/components/layout/Layout';
import VoteComponent from '@/components/Selection';

import ERC20Abi from '../../../../contract/out/ERC20.sol/ERC20.json';
import VaultAbi from '../../../../contract/out/Vault.sol/Vault.json';
import FlashloanExample from '@/components/FlashLoanExample';
import { formatEther, parseEther } from 'viem';
import Deposit from '@/components/Deposit';
import Withdraw from '@/components/Withdraw';

export default function Funds() {
  const router = useRouter();
  const { address: VaultAddress } = router.query;
  const endTimestamp = new Date('2023-10-31T23:59:59').getTime();
  const [isVoting, setisVoting] = useState<boolean>(false);
  const [assetTokenAddress, setAssetTokenAddress] = useState('0x');
  const [tokenBalance, setTokenBalance] = useState<string>('')
  const { address } = useAccount();
  const [flashloadAddress, setFlashloadAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0); // reuse for flashloand and deposit

  const tabs = ['Flashloan', 'Investments'];
  const [currentTab, setCurrentTab] = useState<number>(0);

  // Read token
  const { data: token, refetch: refetchVault } = useContractReads({
    contracts: [
      {
        address: VaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'name',
      },
      {
        address: VaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'symbol',
      },
      {
        address: VaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'totalAssets',
      },
      {
        address: VaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'asset',
      },
      {
        address: VaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'balanceOf',
        args: [address] as any
      },
      {
        address: VaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'getFee',
      }
    ],
  });

  useEffect(() => {
    if (token && token[3].status === 'success' && token[4].status === 'success') {
      setAssetTokenAddress(token[3].result.toString());
      setTokenBalance(token[4].result.toString());
    }
  }, [token]);

  const fee = useMemo(() => {
    return (token && !!token[5].result) ? (Number(token[5].result?.toString())/100).toString() : "Loading..."
  }, [token])

  const { data: asset, refetch: refetchAssets } = useContractReads({
    contracts: [
      {
        address: assetTokenAddress as `0x${string}`,
        abi: ERC20Abi.abi as any,
        functionName: 'name',
      },
      {
        address: assetTokenAddress as `0x${string}`,
        abi: ERC20Abi.abi as any,
        functionName: 'symbol',
      },
      {
        address: VaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'convertToAssets',
        args: [tokenBalance] as any
      },
      {
        address: assetTokenAddress as `0x${string}`,
        abi: ERC20Abi.abi as any,
        functionName: 'allowance',
        args: [address, VaultAddress]
      },
      {
        address: assetTokenAddress as `0x${string}`,
        abi: ERC20Abi.abi as any,
        functionName: 'balanceOf',
        args: [address]
      }
    ],
  });

  useEffect(() => {
    // Call fetchData immediately when the component renders
    refetchAssets?.();
    refetchVault?.()

    // Set up an interval to call fetchData every 10 seconds
    const interval = setInterval(() => {
      refetchAssets?.();
      refetchVault?.()
    }, 5000); // 5000 milliseconds = 10 seconds

    // Cleanup khi component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const { data: flashloanHash, isLoading: isFlashloanLoading, isSuccess: isFlashloanSuccess, write: triggerFlashloan } = useContractWrite({
    address: VaultAddress as `0x${string}`,
    abi: VaultAbi.abi as any,
    functionName: 'flashLoanSimple',
  })

  const isWithdraw = useMemo(() => {
    if(token && !!token[4].result) return Number(token[4].result) > 0
    return false
  }, [token])

  return (
    <Layout>
      <div className='card w-full border '>
        <div className='stats'>
          <div className='stat'>
            <div className='stat-title'>Total Tokens</div>
            <div className='stat-value text-primary'>
              {token && token[2].result != undefined && formatEther(BigInt(token[2].result.toString()))} {asset && asset[1].result}
            </div>
            <div className='stat-desc'></div>
          </div>
          <div className='stat'>
            <div className='stat-title'>Current Fee</div>
            <div className='stat-value text-secondary'>
              {fee} %
            </div>
            <div className='stat-desc'></div>
          </div>
          <div className='stat'>
            <div className='stat-title'>Interest</div>
            <div className='stat-value'>86%</div>
            <div className='stat-desc text-secondary'></div>
          </div>
        </div>
      </div>

      <div className='flex mt-8'>
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

      <div className='pb-8 grid grid-cols-4 gap-4 glass rounded-e-lg rounded-bl-lg'>
        {currentTab === 0 ? (
          <div className='card w-full col-span-4 grid grid-cols-3'>
            <div className='col-span-2 h-m-96 p-8'>
              <FlashloanExample />
              <div className='form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Flashload Address</span>
                </label>
                <input
                  onChange={(e) => setFlashloadAddress(e.target.value)}
                  type='text'
                  placeholder='Type Token Address'
                  className='input input-bordered w-full rounded-md'
                />
              </div>
              <div className='form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Amount</span>
                </label>
                <input
                  onChange={(e) => setAmount(Number(e.target.value))}
                  type='number'
                  placeholder='Type Amount'
                  className='input input-bordered w-full rounded-md'
                />
              </div>
            </div>
            <div className='border-l p-8'>
              <div className='h-60'>
                <h1 className='text-center mb-16'> Total Repay</h1>
                <h1 className='text-center'>{amount && (amount + (amount * (Number(fee) * 100))/100)} {asset && asset[1].result}</h1>
              </div>
              <div className='flex justify-around'>
                <button className='btn w-32 btn-success' onClick={() =>
                  triggerFlashloan({
                    args: [flashloadAddress, parseEther(amount.toString())],
                  })}>
                Run
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='card w-full col-span-4 grid grid-cols-3'>
            <div className='col-span-2 h-m-96 p-8'>
              {isVoting ? (
                <button className='btn'>Calling for a Vote</button>
              ) : (
                <div className='flex flex-col justify-between h-full'>
                  {/* <div className='flex justify-between'>
                    <h1>Title</h1>
                    <CountDown endTimestamp={endTimestamp} />
                  </div>
                  <VoteComponent />
                  <div className='flex justify-end'>
                    <button className='btn w-32'>Submit</button>
                  </div> */}
                </div>
              )}
            </div>
            <div className='border-l p-8'>
              <div className='h-60'>
                <h1 className='text-center mb-16'>Your Staked</h1>
                {token && asset &&
                  token[4].result !== undefined &&
                  asset[2].result !== undefined &&
                  <div className='flex justify-center'>
                    <h1 className='text-center'></h1>
                    <h1 className='text-center'>
                      {formatEther(BigInt(asset[2].result.toString()))} {asset[1].result}
                    </h1>
                    <p className='flex items-end px-2'>
                      = {formatEther(BigInt(asset[2].result.toString()))} {token[1].result}
                    </p>
                  </div>
                }
              </div>
              <div className='grid grid-cols-2 gap-4'>
                {asset && token && asset[3].result != undefined &&
                  asset[4].result != undefined &&
                  <div className={`${!isWithdraw && 'col-span-2'} grid grid-cols-1`}>
                    <Deposit
                      allowance={Number(asset[3].result)}
                      vaultAddress={VaultAddress as string}
                      tokenAddress={assetTokenAddress}
                      symbol={asset && asset[1].result}
                      balance={asset[4].result}/>
                  </div>
                }
                {isWithdraw &&
                  <Withdraw
                    vaultAddress={VaultAddress as string}
                    symbol={asset && asset[1].result}
                    convertToAssets={asset && asset[2].result}
                  />
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
