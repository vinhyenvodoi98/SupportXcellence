'use client';
import { OutputData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import Layout from '@/components/layout/Layout';

const EditorBlock = dynamic(() => import('../components/Editor'), {
  ssr: false,
});

export default function CreateProject() {
  const [editorData, setEditorData] = useState<OutputData>({
    blocks: [
      {
        type: 'header',
        data: {},
      },
    ], // Provide initial blocks or an empty array
  });

  const handleEditorChange = (data: any) => {
    setEditorData(data);
  };

  return (
    <Layout>
      <div className='grid grid-cols-4 gap-4'>
        <div className='shadow-xl rounded-box border col-span-3'>
          <EditorBlock
            data={editorData}
            onChange={handleEditorChange}
            holder='editorjs-container'
          />
        </div>
        <div className='shadow-xl rounded-box border col-span-1 p-8 max-h-64 sticky top-24'>
          <div className='grid place-content-center'>
            <h1>Title</h1>
            <p>
              But a recent study shows that the celebrated appetizer may be
              linked to a series of rabies cases springing up around the
              country.
            </p>
            <button className='btn btn-active btn-success'>Submit</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
