import { useRef } from 'react';
import DataTable from './components/DataTable';
import DetailPanel from './components/DetailPanel';

const draftTeams = [
  {
    id: 1,
    name: 'Team no hope',
    description: 'N/A',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    members: [
      {
        name: 'Sen',
        photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
        description: 'N/A'
      }
    ]
  }
];
function Teams() {
  const detailPanelRef = useRef();

  const openDetailPanel = (data: A) => {
    (detailPanelRef.current as A).openDrawer(data);
  };

  return (
    <>
      <DataTable data={draftTeams} openPanel={openDetailPanel} />
      <DetailPanel refreshList={() => console.log('ok')} ref={detailPanelRef} />
    </>
  );
}

export default Teams;
