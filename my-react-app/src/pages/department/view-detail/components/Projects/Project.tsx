import { useLoading } from '../../../../../common/context/useLoading';
import DataTable from './components/DataTable';
import { useEffect, useState } from 'react';

const draftProject = [
  {
    id: 1,
    title: 'Test Project',
    description: 'Test Description',
    progress: '50',
    startDate: '2012/12/12',
    dueDate: '2012/12/12',
    updateDate: '2012/12/12',
    closeDate: '2012/12/12'
  }
];
function Projects() {
  const [loading, setLoading] = useState<boolean>(false);
  const { showLoading, closeLoading } = useLoading();

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = () => {
    showLoading();
    setLoading(true);
    const timeout = setTimeout(() => {
      closeLoading();
      setLoading(false);
      clearTimeout(timeout);
    }, 2000);
  };

  return (
    <>
      <DataTable data={draftProject} loading={loading} refreshList={() => console.log('refresh')} />
    </>
  );
}

export default Projects;
