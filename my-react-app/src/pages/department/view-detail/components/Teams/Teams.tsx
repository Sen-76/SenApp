import { useRef, useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import DetailPanel from './components/DetailPanel';
import Panel from './components/Panel';
import { useLoading } from '../../../../../common/context/useLoading';

const draftTeams = [
  {
    id: 1,
    name: 'Team no hope',
    description: 'N/A',
    members: [
      {
        id: 1,
        name: 'Sen 1',
        job: 'Developer',
        gender: 'Male',
        photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
        description: 'N/A'
      },
      {
        id: 2,
        name: 'Sen 2',
        job: 'Developer',
        gender: 'Male',
        photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
        description: 'N/A'
      },
      {
        id: 3,
        name: 'Sen 3',
        job: 'Developer',
        gender: 'Male',
        photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
        description: 'N/A'
      },
      {
        id: 4,
        name: 'Sen 4',
        job: 'Developer',
        gender: 'Male',
        photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
        description: 'N/A'
      },
      {
        id: 5,
        name: 'Sen 5',
        job: 'Developer',
        gender: 'Male',
        photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
        description: 'N/A'
      }
    ]
  },
  {
    id: 2,
    name: 'Team hope less',
    description: 'N/A',
    members: []
  }
];
function Teams() {
  const panelRef = useRef();
  const detailPanelRef = useRef();
  const { showLoading, closeLoading } = useLoading();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getTeams();
  }, []);

  const openPanel = (data: A) => {
    (panelRef.current as A).openDrawer(data);
  };

  const openDetailPanel = (data: A) => {
    (detailPanelRef.current as A).openDrawer(data);
  };

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
      <DataTable
        data={draftTeams}
        openPanel={openPanel}
        openDetailPanel={openDetailPanel}
        refreshList={getTeams}
        loading={loading}
      />
      <DetailPanel refreshList={getTeams} ref={detailPanelRef} />
      <Panel refreshList={getTeams} ref={panelRef} />
    </>
  );
}

export default Teams;
