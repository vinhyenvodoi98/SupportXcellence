import Image from 'next/image';

export default function FundCard() {
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
          <h2 className='card-title mx-4'>Card title!</h2>
        </div>
        <p>If a dog chews shoes whose shoes does he choose?</p>
      </div>
    </div>
  );
}
