'use client';
import { OutputData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import Step from '@/components/Step';

const EditorBlock = dynamic(() => import('../../../components/Editor'), {
  ssr: false,
});

export default function CreateProject() {
  const steps = [{
    title: "Round Details",
    description: "What is round name, Funding period, Which chain do you want to raise funds on?",
  },{
    title: "Funding Settings",
    description: "What token that you want for payout",
  },{
    title: "Review Information",
    description: "Review round information and fill in other necessary details",
  }]
  const [current, setCurrentIndex] = useState<number>(0)
  const [editorData, setEditorData] = useState<OutputData>({
    blocks: [
      {
        type: 'header',
        data: {},
      },
    ],
  });

  const handleEditorChange = (data: any) => {
    setEditorData(data);
  };

  const next = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, steps.length - 1));
  };

  const prev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  return (
    <Layout>
      <div className='grid grid-cols-4 gap-8'>
        <div className='shadow-xl rounded-box border col-span-4 p-8 flex justify-center'>
          <Step current={current} steps={steps}/>
        </div>
        <div className='shadow-xl rounded-box border col-span-3'>
          <EditorBlock
            data={editorData}
            onChange={handleEditorChange}
            holder='editorjs-container'
          />
        </div>
        <div className='shadow-xl rounded-box border col-span-1 p-8 max-h-72 sticky top-24'>
          <div className='grid grid-rows-3 gap-4'>
            <h1>{steps[current].title}</h1>
            <p>
              {steps[current].description}
            </p>
            {current + 1 === steps.length ?
              <div className='grid grid-cols-2 gap-4'>
                <button onClick={prev} className='btn btn-active'>Previous</button>
                <button className='btn btn-active btn-success'>Submit</button>
              </div>
              : current ===0 ?
              <button onClick={next} className='btn btn-active btn-success'>Next</button>
              :
              <div className='grid grid-cols-2 gap-4'>
                <button onClick={prev} className='btn btn-active'>Previous</button>
                <button onClick={next} className='btn btn-active btn-success'>Next</button>
              </div>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}
