import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { formatEther, parseEther } from 'viem';
import { useAccount, useContractWrite } from 'wagmi';

import { chainInfo } from '@/constant/chain';

import ERC20Abi from '../../../../contract/out/ERC20.sol/ERC20.json';
import VaultAbi from '../../../../contract/out/Vault.sol/Vault.json';

interface DepositInterface {
  allowance: number;
  tokenAddress: string;
  vaultAddress: string;
  symbol: any;
  balance: any;
}

const Deposit = ({
  allowance,
  vaultAddress,
  tokenAddress,
  symbol,
  balance,
}: DepositInterface) => {
  const [amount, setAmount] = useState(0);
  const { address } = useAccount();
  const router = useRouter();
  const { chain: vaultChainId } = router.query;
  const chains = chainInfo as any;

  const {
    data: approveHash,
    isLoading: isApproveLoading,
    isSuccess: isApproveSuccess,
    write: triggerApprove,
  } = useContractWrite({
    address: tokenAddress as `0x${string}`,
    abi: ERC20Abi.abi as any,
    functionName: 'approve',
  });

  const {
    data: depositHash,
    isLoading: isDepositLoading,
    isSuccess: isDepositSuccess,
    write: triggerDeposit,
  } = useContractWrite({
    address: vaultAddress as `0x${string}`,
    abi: VaultAbi.abi as any,
    functionName: 'deposit',
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
    if (isApproveLoading)
      toast.success(
        `Transaction has been created successfully: ${
          chains[vaultChainId as string].browserURL
        }/tx/${approveHash?.hash}`
      );
  }, [isApproveSuccess]);

  useEffect(() => {
    if (isDepositLoading || isApproveLoading) toast.info('Transaction created');
  }, [isDepositLoading, isApproveLoading]);

  const handle = () => {
    if (isApproved) {
      triggerDeposit({
        args: [parseEther(amount.toString()), address as string],
      });
    } else {
      triggerApprove({
        args: [vaultAddress, parseEther(amount.toString())],
      });
    }
  };

  const isApproved = useMemo(() => {
    if (Number(allowance) === 0) return false;
    return Number(allowance) >= Number(parseEther(amount.toString()));
  }, [amount, allowance]);

  return (
    <>
      <button
        className='btn btn-success'
        onClick={() =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          document.getElementById('deposit').showModal()
        }
      >
        Deposit
      </button>

      <dialog id='deposit' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <h3 className='font-bold text-lg'>
            {isApproved ? 'Deposit' : 'Approve'}
          </h3>
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
              {isApproved ? 'Deposit' : 'Approve'}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Deposit;
