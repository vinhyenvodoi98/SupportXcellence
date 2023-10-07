import * as React from 'react';
import { useAccount } from 'wagmi';

import Layout from '@/components/layout/Layout';

import { toast } from "react-toastify";
import { useContract } from '@/contexts/Contract';

export default function HomePage() {
  const { address } = useAccount();
  const { count, increment } = useContract();
  const addNotification = () => {
    // https://fkhadra.github.io/react-toastify/promise
    const functionThatReturnPromise = () => new Promise(resolve => setTimeout(resolve, 3000));
    toast.promise(
      functionThatReturnPromise,
      {
        pending: 'Promise is pending',
        success: 'Promise resolved 👌',
        error: 'Promise rejected 🤯'
      }
    )
  };

  console.log({count})

  return (
    <Layout>
      <div>{address}</div>
      <div>data: {count && count.toString()}</div>
      <button onClick={increment}>Click</button>

      <button onClick={() => addNotification()}>Notification</button>
    </Layout>
  );
}
