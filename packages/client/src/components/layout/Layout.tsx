import { useRouter } from 'next/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { chain: vaultChainId } = router.query;

  return (
    <div className='relative'>
      <div
        id='background'
        className={`${
          (vaultChainId as string) === '5'
            ? 'bg-5'
            : (vaultChainId as string) === '5001'
            ? 'bg-5001'
            : (vaultChainId as string) === '5001'
            ? 'bg-534351'
            : (vaultChainId as string) === '420'
            ? 'bg-420'
            : ''
        } bg-opacity-25 absolute top-main w-screen h-screen`}
      />
      <div className='px-4'>{children}</div>
    </div>
  );
}
