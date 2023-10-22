import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { formatEther, parseEther } from 'viem';
import { useAccount, useContractWrite } from 'wagmi';

import VaultAbi from '../../../../contract/out/Vault.sol/Vault.json';

interface MWithdrawInterface {
  vaultAddress: string;
  symbol: any;
  convertToAssets: any;
}

const MWithdraw = ({
  vaultAddress,
  symbol,
  convertToAssets,
}: MWithdrawInterface) => {
  const [amount, setAmount] = useState(0);
  const { address } = useAccount();

  const {
    data: withdrawHash,
    isLoading: isWithdrawLoading,
    isSuccess: isWithdrawSuccess,
    write: triggerWithdraw,
  } = useContractWrite({
    address: vaultAddress as `0x${string}`,
    abi: VaultAbi.abi as any,
    functionName: 'withdraw',
  });

  useEffect(() => {
    if (isWithdrawSuccess) toast.success('Vault has been created successfully');
  }, [isWithdrawSuccess]);

  useEffect(() => {
    if (isWithdrawLoading) toast.info('Transaction created');
  }, [isWithdrawLoading]);

  const handle = () => {
    triggerWithdraw({
      args: [
        parseEther(amount.toString()),
        address as string,
        address as string,
      ],
    });
  };

  return (
    <>
      <button
        className='btn btn-outline'
        onClick={() =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          document.getElementById('mwithdraw').showModal()
        }
      >
        Withdraw
      </button>
      <dialog id='mwithdraw' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <h3 className='font-bold text-lg'>Withdraw</h3>
          <label className='label flex justify-between'>
            <span className='label-text'>Amount: </span>
            <span className='label-text'>
              max {convertToAssets && formatEther(convertToAssets.toString())}{' '}
              {symbol}
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
              WithDraw
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MWithdraw;
