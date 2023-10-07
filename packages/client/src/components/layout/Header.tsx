import * as React from 'react';

import Wallet from '@/components/Providers/wallet';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='layout flex h-14 items-center justify-between'>
        <div>Home</div>
        <Wallet />
      </div>
    </header>
  );
}
