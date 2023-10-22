import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { useChainId, useContractRead, useContractWrite } from 'wagmi';

interface ContractContextType {
  VaultContractsGoerli: any;
  VaultContractsScroll: any;
  VaultContractsMantle: any;
  isVaultLoading: boolean;
  isVaultSuccess: boolean;
  vaultData: any;
  createVault: any;
}

const ContractContext = createContext<ContractContextType | undefined>(
  undefined
);

import VaultFactoryAbi from '../../../contract/out/VaultFactory.sol/VaultFactory.json';
import Addresses from '../../../contract/output.json';

export const ContractProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const chainid = useChainId();
  const vaultFactoryAddress = Addresses as any;

  // Get data
  const { data: VaultContractsGoerli, refetch: senderRefetchGoerli } = useContractRead({
    address: vaultFactoryAddress[5].VaultFactory as `0x${string}`,
    abi: VaultFactoryAbi.abi as any,
    functionName: 'getDeployedContracts',
    chainId: 5,
    cacheTime: 10_000,
    staleTime: 10_000,
  });

  const { data: VaultContractsScroll, refetch: senderRefetchScroll } = useContractRead({
    address: vaultFactoryAddress[534351].VaultFactory as `0x${string}`,
    abi: VaultFactoryAbi.abi as any,
    functionName: 'getDeployedContracts',
    chainId: 534351,
    cacheTime: 10_000,
    staleTime: 10_000,
  });

  const { data: VaultContractsMantle, refetch: senderRefetchMantle } = useContractRead({
    address: vaultFactoryAddress[5001].VaultFactory as `0x${string}`,
    abi: VaultFactoryAbi.abi as any,
    functionName: 'getDeployedContracts',
    chainId: 5001,
    cacheTime: 10_000,
    staleTime: 10_000,
  });

  useEffect(() => {
    // Call fetchData immediately when the component renders
    senderRefetchGoerli?.();
    senderRefetchMantle?.();
    senderRefetchScroll?.();

    // Set up an interval to call fetchData every 10 seconds
    const interval = setInterval(() => {
      senderRefetchGoerli?.();
      senderRefetchMantle?.();
      senderRefetchScroll?.();
    }, 10000); // 10000 milliseconds = 10 seconds

    // Cleanup khi component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  // write contract
  const {
    data: vaultData,
    write: createVault,
    isLoading: isVaultLoading,
    isSuccess: isVaultSuccess,
  } = useContractWrite({
    abi: VaultFactoryAbi.abi as any,
    address: vaultFactoryAddress[chainid].VaultFactory as `0x${string}`,
    functionName: 'createContractVault',
  });

  // vaultData ={hash: '0xf14271c7cf37de5e0a6a5ff20e59a5afa7c7b3ea6e919a7aa56c09c711e3a0fc'}
  return (
    <ContractContext.Provider
      value={{
        VaultContractsGoerli,
        VaultContractsScroll,
        VaultContractsMantle,
        vaultData,
        isVaultLoading,
        isVaultSuccess,
        createVault,
      }}
    >
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
