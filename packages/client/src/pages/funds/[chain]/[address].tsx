import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { formatEther, parseEther } from 'viem';
import {
  useAccount,
  useChainId,
  useContractReads,
  useContractWrite,
} from 'wagmi';

import CountDown from '@/components/CountDown';
import Deposit from '@/components/Deposit';
import FlashloanExample from '@/components/FlashLoanExample';
import Layout from '@/components/layout/Layout';
import MultiDeposit from '@/components/MultiDeposit';
import VoteComponent from '@/components/Selection';
import Withdraw from '@/components/Withdraw';

import { chainInfo } from '@/constant/chain';

import ERC20Abi from '../../../../../contract/out/ERC20.sol/ERC20.json';
import VaultAbi from '../../../../../contract/out/Vault.sol/Vault.json';

export default function Funds() {
  const router = useRouter();
  const { chain: vaultChainId, address: VaultAddress } = router.query;
  const endTimestamp = new Date('2023-10-31T23:59:59').getTime();
  const [isVoting, setisVoting] = useState<boolean>(false);
  const [assetTokenAddress, setAssetTokenAddress] = useState('0x');
  const [tokenBalance, setTokenBalance] = useState<string>('');
  const { address } = useAccount();
  const [flashloadAddress, setFlashloadAddress] = useState<string>('');
  const [amount, setAmount] = useState<number>(0); // reuse for flashloand and deposit
  const [multiChainAmount, setMultiChainAmount] = useState<number>(0);

  const tabs = ['Flashloan', 'Investments'];
  const [currentTab, setCurrentTab] = useState<number>(0);
  const chains = chainInfo as any;
  const chainId = useChainId();

  // Read token
  const { data: token, refetch: refetchVault } = useContractReads({
    contracts: [
      {
        address: VaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'name',
        chainId: Number(vaultChainId as string),
      },
      {
        address: VaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'symbol',
        chainId: Number(vaultChainId as string),
      },
      {
        address: VaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'totalAssets',
        chainId: Number(vaultChainId as string),
      },
      {
        address: VaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'asset',
        chainId: Number(vaultChainId as string),
      },
      {
        address: VaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'balanceOf',
        args: [address] as any,
        chainId: Number(vaultChainId as string),
      },
      {
        address: VaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'getFee',
        chainId: Number(vaultChainId as string),
      },
    ],
  });

  useEffect(() => {
    if (
      token &&
      token[3].status === 'success' &&
      token[4].status === 'success'
    ) {
      setAssetTokenAddress(token[3].result.toString());
      setTokenBalance(token[4].result.toString());
    }
  }, [token]);

  const fee = useMemo(() => {
    return token && !!token[5].result
      ? (Number(token[5].result?.toString()) / 100).toString()
      : 'Loading...';
  }, [token]);

  const { data: asset, refetch: refetchAssets } = useContractReads({
    contracts: [
      {
        address: assetTokenAddress as `0x${string}`,
        abi: ERC20Abi.abi as any,
        functionName: 'name',
        chainId: Number(vaultChainId as string),
      },
      {
        address: assetTokenAddress as `0x${string}`,
        abi: ERC20Abi.abi as any,
        functionName: 'symbol',
        chainId: Number(vaultChainId as string),
      },
      {
        address: VaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'convertToAssets',
        args: [tokenBalance] as any,
        chainId: Number(vaultChainId as string),
      },
      {
        address: assetTokenAddress as `0x${string}`,
        abi: ERC20Abi.abi as any,
        functionName: 'allowance',
        args: [address, VaultAddress] as any,
        chainId: Number(vaultChainId as string),
      },
      {
        address: assetTokenAddress as `0x${string}`,
        abi: ERC20Abi.abi as any,
        functionName: 'balanceOf',
        args: [address] as any,
        chainId: Number(vaultChainId as string),
      },
    ],
  });

  useEffect(() => {
    // Call fetchData immediately when the component renders
    refetchAssets?.();
    refetchVault?.();

    // Set up an interval to call fetchData every 10 seconds
    const interval = setInterval(() => {
      refetchAssets?.();
      refetchVault?.();
    }, 5000); // 5000 milliseconds = 10 seconds

    // Cleanup khi component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const {
    data: flashloanHash,
    isLoading: isFlashloanLoading,
    isSuccess: isFlashloanSuccess,
    write: triggerFlashloan,
  } = useContractWrite({
    address: VaultAddress as `0x${string}`,
    abi: VaultAbi.abi as any,
    functionName: 'flashLoanSimple',
  });

  useEffect(() => {
    if (isFlashloanSuccess)
      toast.success(
        `Transaction has been created successfully: ${
          chains[vaultChainId as string].browserURL
        }/tx/${flashloanHash?.hash}`
      );
  }, [isFlashloanSuccess]);

  useEffect(() => {
    if (isFlashloanLoading) toast.info('Transaction created');
  }, [isFlashloanLoading]);

  const isWithdraw = useMemo(() => {
    if (
      (token && !!token[4].result && Number(token[4].result) > 0) ||
      multiChainAmount > 0
    )
      return true;
    return false;
  }, [token, multiChainAmount]);

  const isMultiChain = useMemo(() => {
    return Number(vaultChainId) !== chainId;
  }, [vaultChainId, chainId]);

  return (
    <Layout>
      <div className='card w-full border mt-4'>
        <div className='stats'>
          <div className='stat'>
            <div className='stat-title'>Chain</div>
            <div className='stat-value text-primary'>
              {chains && chains[vaultChainId as string]?.name}
            </div>
            <div className='stat-desc'></div>
          </div>
          <div className='stat'>
            <div className='stat-title'>Total Tokens</div>
            <div className='stat-value text-primary'>
              {token &&
                token[2].result != undefined &&
                formatEther(BigInt(token[2].result.toString()))}{' '}
              {asset && asset[1].result}
            </div>
            <div className='stat-title'>Token Address: {assetTokenAddress}</div>
            <div className='stat-desc'></div>
          </div>
          <div className='stat'>
            <div className='stat-title'>Current Fee</div>
            <div className='stat-value text-secondary'>{fee} %</div>
            <div className='stat-desc'></div>
          </div>
          <div className='stat'>
            <div className='stat-title'>Interest</div>
            <div className='stat-value'>6%</div>
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

      <div className='grid grid-cols-4 gap-4 glass bg-white/70 rounded-e-lg rounded-bl-lg min-h-[500px]'>
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
                <h1 className='text-center'>
                  {amount && amount + (amount * (Number(fee) * 100)) / 10000}{' '}
                  {asset && asset[1].result}
                </h1>
              </div>
              <div className='flex justify-around'>
                <button
                  className='btn w-32 btn-success'
                  onClick={() =>
                    triggerFlashloan({
                      args: [flashloadAddress, parseEther(amount.toString())],
                    })
                  }
                >
                  Run
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='card w-full col-span-4 grid grid-cols-3'>
            <div className='col-span-2 h-m-96 p-8'>
              {isWithdraw ? (
                <div>
                  {isVoting ? (
                    <button className='btn'>Calling for a Vote</button>
                  ) : (
                    <div className='flex flex-col justify-between h-full'>
                      <div className='flex justify-between'>
                        <h1>Update fee</h1>
                        <CountDown endTimestamp={endTimestamp} />
                      </div>
                      <VoteComponent />
                      <div className='flex justify-end'>
                        <button className='btn w-32'>Submit</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h1>Join the vault to get voting rights</h1>
                </div>
              )}
            </div>
            {isMultiChain ? (
              <MultiDeposit
                vaultAddress={VaultAddress as string}
                assetTokenAddress={assetTokenAddress}
                setMultiChainAmount={setMultiChainAmount}
              />
            ) : (
              <div className='p-8 flex flex-col justify-between'>
                <div className='h-72'>
                  <div className='grid grid-rows-2 h-full'>
                    <h1 className=''>Vault </h1>
                    <div className='grid grid-cols-2'>
                      {token &&
                        asset &&
                        token[4].result !== undefined &&
                        token[2].result !== undefined &&
                        asset[2].result !== undefined && (
                          <div className='flex flex-col justify-center'>
                            Staked:
                            <div className='flex justify-center'>
                              <h1 className='text-center'>
                                {formatEther(
                                  BigInt(token[2].result.toString())
                                )}{' '}
                                {asset[1].result}
                              </h1>
                              <p className='flex px-2'>
                                ={' '}
                                {formatEther(
                                  BigInt(asset[2].result.toString())
                                )}{' '}
                                {token[1].result}
                              </p>
                            </div>
                          </div>
                        )}
                      {token && asset && asset[4].result !== undefined && (
                        <div className='flex flex-col justify-center'>
                          Balance:
                          <h1 className='text-center'>
                            {formatEther(BigInt(asset[4].result.toString()))}{' '}
                            {asset[1].result}
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  {asset &&
                    token &&
                    asset[3].result != undefined &&
                    asset[4].result != undefined && (
                      <div
                        className={`${
                          !isWithdraw && 'col-span-2'
                        } grid grid-cols-1`}
                      >
                        <Deposit
                          allowance={Number(asset[3].result)}
                          vaultAddress={VaultAddress as string}
                          tokenAddress={assetTokenAddress}
                          symbol={asset && asset[1].result}
                          balance={asset[4].result}
                        />
                      </div>
                    )}
                  {isWithdraw && (
                    <Withdraw
                      vaultAddress={VaultAddress as string}
                      symbol={asset && asset[1].result}
                      convertToAssets={asset && asset[2].result}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
