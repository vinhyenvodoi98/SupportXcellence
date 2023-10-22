import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useContractReads, useContractWrite } from 'wagmi';

import { chainInfo } from '@/constant/chain';

import UserContractSenderAbi from '../../../../contract/out/UserContractSender.sol/UserContractSender.json';
import UserContractFactoryAbi from '../../../../contract/out/UserContractFactory.sol/UserFactory.json';
import UserContractAddresses from '../../../../contract/output-user.json';
import ERC20Abi from '../../../../contract/out/ERC20.sol/ERC20.json';
import VaultAbi from '../../../../contract/out/Vault.sol/Vault.json';

import { formatEther, isAddress } from 'viem';
import { toast } from 'react-toastify';
import MDeposit from './MDeposit';
import MWithdraw from './MWithdraw';

interface MultiDepositInterface {
  vaultAddress: string
  assetTokenAddress: string
  setMultiChainAmount: any
}

const MultiDeposit = ({ vaultAddress, assetTokenAddress, setMultiChainAmount }: MultiDepositInterface) => {
  const { address } = useAccount();
  const router = useRouter();
  const { chain: vaultChainId } = router.query;
  const [userAddress, setUserAddress] = useState('0x')

  const userContractAddresses = UserContractAddresses as any;

  // Get fee
  const { data: userSender, refetch: refetchUserFactory } =
    useContractReads({
      contracts: [{
        address: userContractAddresses[5].UserContractSender as `0x${string}`,
        abi: UserContractSenderAbi.abi as any,
        functionName: 'quoteGasPayment',
        chainId: 5,
      },{
        address: userContractAddresses[420].UserFactory as `0x${string}`,
        abi: UserContractFactoryAbi.abi as any,
        functionName: 'isHaveUser',
        chainId: 420,
        args: [address] as any
      },{
        address: userContractAddresses[420].UserFactory as `0x${string}`,
        abi: UserContractFactoryAbi.abi as any,
        functionName: 'user',
        chainId: 420,
        args: [address] as any
      }
    ]
    });

    // set userAddress
    useEffect(() => {
      if (
        userSender &&
        userSender[1].status === 'success' &&
        !!userSender[1].result &&
        userSender[2].status === 'success'
      ) {
        setUserAddress(userSender[2].result.toString());
      }
    }, [userSender]);

  const { data: share, refetch: refetchShare } = useContractReads({
    contracts: [
      {
        address: vaultAddress as `0x${string}`,
        abi: ERC20Abi.abi as any,
        functionName: 'balanceOf',
        chainId: Number(vaultChainId as string),
        args: [userAddress] as any,
      },
      {
        address: vaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'name',
        chainId: Number(vaultChainId as string),
      },
      {
        address: vaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'symbol',
        chainId: Number(vaultChainId as string),
      }
    ]
  })

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
        address: vaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'convertToAssets',
        args: [share ? share[0].result : 0] as any,
        chainId: Number(vaultChainId as string),
      },
      {
        address: assetTokenAddress as `0x${string}`,
        abi: ERC20Abi.abi as any,
        functionName: 'allowance',
        args: [userAddress, vaultAddress] as any,
        chainId: Number(vaultChainId as string),
      },
      {
        address: assetTokenAddress as `0x${string}`,
        abi: ERC20Abi.abi as any,
        functionName: 'balanceOf',
        args: [userAddress] as any,
        chainId: Number(vaultChainId as string),
      },
    ],
  });

  useEffect(() => {
    // Call fetchData immediately when the component renders
    refetchUserFactory?.();
    refetchAssets?.();
    refetchShare?.();

    // Set up an interval to call fetchData every 10 seconds
    const interval = setInterval(() => {
      refetchUserFactory?.();
      refetchAssets?.();
      refetchShare?.();
    }, 5000); // 5000 milliseconds = 10 seconds

    // Cleanup khi component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const {
    data: createAccount,
    isLoading: isCreateLoading,
    isSuccess: isCreateSuccess,
    write: triggerCreateUser,
  } = useContractWrite({
    address: userContractAddresses[5].UserContractSender as `0x${string}`,
    abi: UserContractSenderAbi.abi as any,
    functionName: 'createUserContract',
  });

  useEffect(() => {
    if (isCreateSuccess) toast.success('Vault has been created successfully');
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isCreateLoading) toast.info('Transaction created');
  }, [isCreateLoading]);

  useEffect(() => {
    if(share && share[0].result != undefined)
      setMultiChainAmount(share[0].result)
  }, [share])

  const isWithdraw = useMemo(() => {
    if (share && !!share[0].result) return Number(share[0].result) > 0;
    return false;
  }, [share]);

  return <div className='p-8 border-l grid grid-rows-5'>
    <h1>
      Multichain Vault
    </h1>
    <p>
      To be able to use the multichain feature you need to create a new account
    </p>
    <p><strong>Account:</strong> {userAddress}</p>
    <div className='grid grid-cols-2'>
      {share &&
        asset &&
        share[0].result !== undefined &&
        asset[2].result !== undefined &&
        asset[1].result !== undefined && (
          <div className='flex flex-col justify-center'>
            Staked:
            <div className='flex justify-center'>
              <h1 className='text-center'>
                {formatEther(BigInt(share[0].result.toString()))}{' '}
                {share[2].result}
              </h1>
              <p className='flex px-2'>
                = {formatEther(BigInt(asset[2].result.toString()))}{' '}
                {asset[1].result}
              </p>
            </div>
          </div>
        )}
      {asset &&
        asset[4].result !== undefined &&
        asset[1].result !== undefined && (
          <div className='flex flex-col justify-center'>
            Balance:
            <h1 className='flex px-2'>
              {formatEther(BigInt(asset[4].result.toString()))}{' '}
              {asset[1].result}
            </h1>
            <p></p>
          </div>
        )}
    </div>
    {
      userSender && userSender[0].result != undefined &&
      (!!userSender[1].result ?
        <div className='grid grid-cols-2 gap-4 mt-8'>
          {asset &&
            asset[2].result != undefined &&
            asset[1].result != undefined && (
              <div
                className={`${
                  !isWithdraw && 'col-span-2'
                } grid grid-cols-1`}
              >
                <MDeposit
                  userContractSender = {userContractAddresses[5].UserContractSender as `0x${string}`}
                  fee = { userSender[0].result as any}
                  vaultAddress={vaultAddress as string}
                  tokenAddress={assetTokenAddress}
                  userAddress={userAddress}
                  symbol={asset && asset[1].result}
                  balance={asset[4].result}
                />
              </div>
            )}
          {isWithdraw && (
            <MWithdraw
              vaultAddress={vaultAddress as string}
              symbol={asset && asset[1].result}
              convertToAssets={asset && asset[2].result}
            />
          )}
        </div>
      :
        <button className='btn btn-success' onClick={() => triggerCreateUser({
          args:[{owner: address}, userContractAddresses[420].UserFactory],
          value: userSender[0].result as any
        })}>
          {`Create Account (fee: ${formatEther(BigInt(userSender[0].result.toString()))})`}
        </button>)
    }
  </div>;
};

export default MultiDeposit;
