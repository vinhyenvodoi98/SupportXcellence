import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import {
  useChainId,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

interface ContractContextType {
  VaultContracts: any;
  // increment: (() => void) | undefined;
}

const ContractContext = createContext<ContractContextType | undefined>(
  undefined
);

import VaultFactoryAbi from '../../../contract/out/VaultFactory.sol/VaultFactory.json';
import VaultFactoryAddress from '../../../contract/output.json';

export const ContractProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const chainid = useChainId()
  // Get data
  const { data: VaultContracts, refetch: senderRefetch } = useContractRead({
    address: VaultFactoryAddress[chainid].VaultFactory as `0x${string}`,
    abi: VaultFactoryAbi.abi as any,
    functionName: 'getDeployedContracts',
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
  // const { config } = usePrepareContractWrite({
  //   abi: contractAbi.abi,
  //   address: contractAddress['5001'].address as `0x${string}`,
  //   functionName: 'increment',
  //   args: [],
  // });

  // const { write: increment } = useContractWrite(config);

  return (
    <ContractContext.Provider value={{ VaultContracts }}>
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
