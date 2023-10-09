import CountDown from "@/components/CountDown";
import Layout from "@/components/layout/Layout";
import VoteComponent from "@/components/Selection";
import { useState } from "react";

export default function Funds() {
  const endTimestamp = new Date('2023-10-31T23:59:59').getTime();
  const [isVoting, setisVoting] = useState<boolean>(false)

  return (
    <Layout>
      <div className='card w-full border shadow-xl'>
        <div className="stats">
          <div className="stat">
            <div className="stat-title">Total Tokens</div>
            <div className="stat-value text-primary">25.6K USDT</div>
            <div className="stat-desc"></div>
          </div>
          <div className="stat">
            <div className="stat-title">Number Member</div>
            <div className="stat-value text-secondary">2.6M</div>
            <div className="stat-desc"></div>
          </div>
          <div className="stat">
            <div className="stat-title">Interest</div>
            <div className="stat-value">86%</div>
            <div className="stat-desc text-secondary"></div>
          </div>
        </div>
      </div>

      <div className='card w-full border shadow-xl my-8 grid grid-cols-3'>
        <div className="col-span-2 h-m-96 p-8">
          {
            isVoting ?
              <button className="btn">Calling for a Vote</button>
            :
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between">
                <h1>Title</h1>
                <CountDown endTimestamp={endTimestamp}/>
              </div>
              <VoteComponent />
              <div className="flex justify-end">
                <button className="btn w-32">Submit</button>
              </div>
            </div>
          }
        </div>
        <div className="border-l p-8">
          <div className="h-60">
            <h1 className="text-center mb-16">Your Balance</h1>
            <h1 className="text-center">230 USDT</h1>
          </div>
          <div className="flex justify-around">
            <button className="btn w-32">Deposit</button>
            <button className="btn w-32">Withdraw</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
