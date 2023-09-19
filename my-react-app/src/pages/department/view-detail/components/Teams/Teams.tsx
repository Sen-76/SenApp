import { useRef } from 'react';
import DataTable from './components/DataTable';
import DetailPanel from './components/DetailPanel';
import Panel from './components/Panel';

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
  const panelRef = useRef();
  const detailPanelRef = useRef();

  const openPanel = (data: A) => {
    (panelRef.current as A).openDrawer(data);
  };

  const openDetailPanel = (data: A) => {
    (detailPanelRef.current as A).openDrawer(data);
  };

  return (
    <>
      <DataTable data={draftTeams} openPanel={openPanel} openDetailPanel={openDetailPanel} />
      <DetailPanel refreshList={() => console.log('ok')} ref={detailPanelRef} />
      <Panel refreshList={() => console.log('ok')} ref={panelRef} />
    </>
  );
}

export default Teams;
