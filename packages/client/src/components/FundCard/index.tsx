import Image from 'next/image';
import { useContractReads } from 'wagmi';

import VaultAbi from '../../../../contract/out/ERC4626.sol/ERC4626.json'

export default function FundCard({vaultAddress}:{vaultAddress:string}) {
  // Read token
  const { data: token } = useContractReads({
    contracts: [{
      address: vaultAddress as `0x${string}`,
      abi: VaultAbi.abi as any,
      functionName: 'name',
    },{
      address: vaultAddress as `0x${string}`,
      abi: VaultAbi.abi as any,
      functionName: 'symbol',
    }]
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
            <Image
              className='rounded-full border absolute top-[-5px] right-[-12px]'
              alt='scroll'
              width={24}
              height={24}
              src='/images/chains/scroll.svg'
            />
          </div>
          {token &&
            <h2 className='card-title mx-4'> {token[0].result}</h2>
          }
        </div>
        <p>Contract Address: <strong>{vaultAddress}</strong></p>
        {token &&
          <p>Token symbol: <strong>{token[1].result}</strong></p>
        }
      </div>
    </div>
  );
}
