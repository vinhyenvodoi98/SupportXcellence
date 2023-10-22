import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import Wallet from '@/components/Providers/wallet';

export default function Header() {
  return (
    <div className='z-10 p-4 sticky top-0 bg-transparent'>
      <div className='navbar shadow-xl rounded-box border bg-white'>
        <div className='flex-1'>
          <Link href='/' className='btn btn-ghost normal-case text-xl flex'>
            <Image src='/images/logo.png' alt='logo' width={40} height={40} />
            SuppX
          </Link>
        </div>
        <div className='flex-none gap-2'>
          <Link href='/funds/create'>
            <button className='btn border rounded-box'>Create Fund</button>
          </Link>
          <Wallet />
        </div>
      </div>
    </div>
  );
}
