import DataTable from './components/DataTable';
import { useState } from 'react';

function Projects() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <DataTable data={[]} loading={loading} refreshList={() => console.log('refresh')} />
    </>
  );
}

export default Projects;
