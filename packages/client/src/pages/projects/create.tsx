import { useState } from 'react';
import Select from 'react-select';

import Layout from '@/components/layout/Layout';

export default function CreateProject() {
  const [value, setValue] = useState('Option 1');

  const handleChange = (option: string) => {
    setValue(option);
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [selectedOption, setSelectedOption] = useState<any>(null);

  return (
    <Layout>
      <div className='grid grid-cols-4 gap-8'>
        <div className='shadow-xl rounded-box border col-span-3 p-8'>
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>What is your name?</span>
            </label>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full max-w-xs'
            />
          </div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className='shadow-xl rounded-box border col-span-1 p-8 max-h-72 sticky top-24'>
          <div className='grid grid-rows-3 gap-4'>
            <h1>Create a Grant Project</h1>
            <p>Introducing the project and operators address</p>
            <button className='btn btn-active btn-success'>Create</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
