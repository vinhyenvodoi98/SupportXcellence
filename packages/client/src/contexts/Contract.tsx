import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

interface ContractContextType {
  count: any;
  increment: (() => void) | undefined;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

import contractAbi from '../../../contracts-hardhat/artifacts/contracts/Counter.sol/Counter.json';
import contractAddress from '../../../contracts-hardhat/contract-address.json';

export const ContractProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get data
  const { data: count, refetch: senderRefetch } = useContractRead({
    address: contractAddress.address as `0x${string}`,
    abi: contractAbi.abi as any,
    functionName: 'getCount',
    cacheTime: 10_000,
    staleTime: 10_000,
  });

  useEffect(() => {
    // Call fetchData immediately when the component renders
    senderRefetch?.();

    // Set up an interval to call fetchData every 10 seconds
    const interval = setInterval(() => {
      senderRefetch?.();
    }, 10000); // 10000 milliseconds = 10 seconds

    // Cleanup khi component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  // write contract
  const { config } = usePrepareContractWrite({
    abi: contractAbi.abi,
    address: contractAddress.address as `0x${string}`,
    functionName: 'increment',
    args: [],
  });

  const { write:increment } = useContractWrite(config);

  return (
    <ContractContext.Provider value={{ count , increment }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};
