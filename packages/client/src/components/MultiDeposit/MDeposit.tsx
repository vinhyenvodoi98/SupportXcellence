import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { formatEther, parseEther } from 'viem';
import { useContractWrite } from 'wagmi';

import { chainInfo } from '@/constant/chain';

import UserContractSenderAbi from '../../../../contract/out/UserContractSender.sol/UserContractSender.json';

interface MDepositInterface {
  userContractSender: string;
  fee: any;
  tokenAddress: string;
  vaultAddress: string;
  userAddress: string;
  symbol: any;
  balance: any;
}

const MDeposit = ({
  userContractSender,
  fee,
  vaultAddress,
  tokenAddress,
  userAddress,
  symbol,
  balance,
}: MDepositInterface) => {
  const [amount, setAmount] = useState(0);
  const router = useRouter();
  const { chain: vaultChainId } = router.query;
  const chains = chainInfo as any;

  const {
    data: depositHash,
    isLoading: isDepositLoading,
    isSuccess: isDepositSuccess,
    write: triggerDeposit,
  } = useContractWrite({
    address: userContractSender as `0x${string}`,
    abi: UserContractSenderAbi.abi as any,
    functionName: 'vaultInteract',
  });

  useEffect(() => {
    if (isDepositSuccess)
      toast.success(
        `Transaction has been created successfully: ${
          chains[vaultChainId as string].browserURL
        }/tx/${depositHash?.hash}`
      );
  }, [isDepositSuccess]);

  useEffect(() => {
    if (isDepositLoading) toast.info('Transaction created');
  }, [isDepositLoading]);

  const handle = () => {
    triggerDeposit({
      args: [
        {
          functionName: 0,
          amount: parseEther(amount.toString()),
          vaultAddress,
          assetAddress: tokenAddress,
        },
        userAddress as string,
      ],
      value: fee,
    });
  };

  return (
    <>
      <button
        className='btn btn-success'
        onClick={() =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          document.getElementById('mdeposit').showModal()
        }
      >
        Deposit
      </button>

      <dialog id='mdeposit' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <h3 className='font-bold text-lg'>Deposit</h3>
          <label className='label flex justify-between'>
            <span className='label-text'>Amount: </span>
            <span className='label-text'>
              max {balance && formatEther(balance.toString())} {symbol}
            </span>
          </label>
          <label className='input-group'>
            <input
              onChange={(e) => setAmount(Number(e.target.value))}
              type='number'
              placeholder='Type Amount'
              className='input input-bordered w-full rounded-md'
            />
            <span>{symbol}</span>
          </label>

          <div className='flex justify-end my-4'>
            <button className='btn btn-success' onClick={() => handle()}>
              Deposit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MDeposit;
