import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useContractReads } from 'wagmi';

import ERC20Abi from '../../../../contract/out/ERC20.sol/ERC20.json';
import VaultAbi from '../../../../contract/out/Vault.sol/Vault.json';

export default function FundCard({ vaultAddress }: { vaultAddress: string }) {
  const [assetTokenAddress, setAssetTokenAddress] = useState('0x');
  // Read token
  const { data: token } = useContractReads({
    contracts: [
      {
        address: vaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'name',
      },
      {
        address: vaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'symbol',
      },
      {
        address: vaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'totalAssets',
      },
      {
        address: vaultAddress as `0x${string}`,
        abi: VaultAbi.abi as any,
        functionName: 'asset',
      },
    ],
  });

  useEffect(() => {
    if (token && token[3].result)
      setAssetTokenAddress(token[3].result as unknown as string);
  }, [token]);

  const { data: asset } = useContractReads({
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
    ],
  });

  return (
    <div className='card w-full border bg-base-100 shadow-xl cursor-pointer'>
      <div className='card-body'>
        <div className='flex'>
          <div className='relative'>
            <Image
              className='rounded-full border'
              alt='usdt'
              width={50}
              height={50}
              src='/images/coins/usdt.png'
            />
            {/* <Image
              className='rounded-full border absolute top-[-5px] right-[-12px]'
              alt='scroll'
              width={24}
              height={24}
              src='/images/chains/scroll.svg'
            /> */}
          </div>
          {token && <h2 className='card-title mx-4'> {token[0].result}</h2>}
        </div>
        {token && (
          <p>
            Token Address: <strong>{token[3].result}</strong>
          </p>
        )}
        {asset && (
          <p>
            Token symbol: <strong>{asset[1].result}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
