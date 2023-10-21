import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useChainId,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

interface ContractContextType {
  VaultContracts: any;
  isVaultLoading: boolean;
  isVaultSuccess: boolean;
  vaultData: any;
  createVault: (() => void) | undefined;
  setCreateVaultParams: Dispatch<SetStateAction<any[]>>;
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
  const [createVaultParams, setCreateVaultParams] = useState<any[]>([]);
  const vaultFactoryAddress = Addresses as any;

  // Get data
  const { data: VaultContracts, refetch: senderRefetch } = useContractRead({
    address: vaultFactoryAddress[chainid].VaultFactory as `0x${string}`,
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
  const { config } = usePrepareContractWrite({
    abi: VaultFactoryAbi.abi as any,
    address: vaultFactoryAddress[chainid].VaultFactory as `0x${string}`,
    functionName: 'createContractVault',
    args: createVaultParams,
  });

  const { data: vaultData ,write: createVault, isLoading: isVaultLoading, isSuccess: isVaultSuccess } = useContractWrite(config);

  // vaultData ={hash: '0xf14271c7cf37de5e0a6a5ff20e59a5afa7c7b3ea6e919a7aa56c09c711e3a0fc'}
  return (
    <ContractContext.Provider
      value={{ VaultContracts, vaultData, isVaultLoading, isVaultSuccess, createVault, setCreateVaultParams }}
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
