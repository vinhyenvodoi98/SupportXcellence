import * as React from 'react';

import Wallet from '@/components/Providers/wallet';

export default function Header() {
  return (
    <div className=' bg-base-100 p-4'>
      <div className="navbar shadow-xl rounded-box">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Home</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <Wallet />
        </div>
      </div>
    </div>
  );
}
