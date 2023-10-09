import Layout from '@/components/layout/Layout';
import ProjectCard from '@/components/ProjectCard';

export default function HomePage() {
  const projects = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Layout>
      <div className='pt-12'>
        <div className='form-control w-2/3 m-auto mb-8'>
          <input
            type='text'
            placeholder='Search'
            className='input input-bordered w-24 md:w-auto'
          />
        </div>
        <div className='flex'>
          <h1 className='tab tab-lg tab-lifted tab-active'>Projects</h1>
          <div className='border-b w-full'></div>
        </div>
        <div className='grid grid-cols-3 gap-8 pt-8'>
          {projects.map((project, index) => (
            <div key={index}>
              <ProjectCard />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
