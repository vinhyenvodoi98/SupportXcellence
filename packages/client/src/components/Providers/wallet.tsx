import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Wallet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button onClick={openConnectModal} type="button" className='px-4 py-2 border border-gray-300 rounded-xl shadow-sm'>
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button" className='px-4 py-2 border border-gray-300 rounded-xl shadow-sm'>
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                      className='px-4 border border-gray-300 rounded-xl shadow-sm'
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 20,
                            height: 20,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 20, height: 20 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={toggleDropdown}
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        id="dropdown-menu-button"
                        aria-expanded={isOpen ? 'true' : 'false'}
                        aria-haspopup="true"
                      >
                        <div className='mr-4'>
                        {account.ensName || account.displayName}
                        </div>
                        {
                          account.ensAvatar
                          ? <Image
                            src={account.ensAvatar}
                            style={{ borderRadius: '50%'}}
                            width={30}
                            height={30}
                            alt="Podcaster Avatar"
                          />
                          : <img src={`https://robohash.org/${account.address}&200x200`} className="border-2 bg-indigo-300 h-[30px] w-[30px] rounded-full"/>
                        }
                      </button>
                      {isOpen && (
                        <div
                          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="dropdown-menu-button"
                          tabIndex={"-1" as any}
                        >
                          <Link href={`/profile/${account.address}`} className='flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                            <p className='ml-4'>Profile</p>
                          </Link>
                          <div className='flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900' onClick={openAccountModal}>
                            <p className='ml-4'>Disconnect</p>
                          </div>
                        </div>
                      )}
                      </div>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default Wallet;
