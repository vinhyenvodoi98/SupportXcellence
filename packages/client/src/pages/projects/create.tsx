import Layout from "@/components/layout/Layout";

export default function CreateProject() {
  return (
    <Layout>
      <div className='grid grid-cols-4 gap-8'>
        <div className='shadow-xl rounded-box border col-span-3'>
          
        </div>
        <div className='shadow-xl rounded-box border col-span-1 p-8 max-h-72 sticky top-24'>
          <div className='grid grid-rows-3 gap-4'>
            <h1>Create a Grant Project</h1>
            <p>
              Introducing the project and operators address
            </p>
            <button className='btn btn-active btn-success'>Create</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
