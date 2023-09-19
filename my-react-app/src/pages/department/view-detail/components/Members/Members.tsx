import { useRef } from 'react';
import DataTable from './components/DataTable';
import DetailPanel from './components/DetailPanel';
import Panel from './components/Panel';

const draftMembers = [
  {
    id: 1,
    name: 'Sen',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg'
  }
];
function Members() {
  const detailPanelRef = useRef();
  const panelRef = useRef();

  const openDetailPanel = (data: A) => {
    (detailPanelRef.current as A).openDrawer(data);
  };
  const openPanel = () => {
    (panelRef.current as A).openDrawer();
  };

  return (
    <>
      <DataTable data={draftMembers} openPanel={openPanel} openDetailPanel={openDetailPanel} />
      <DetailPanel refreshList={() => console.log('cc')} ref={detailPanelRef} />
      <Panel refreshList={() => console.log('cc')} ref={panelRef} />
    </>
  );
}

export default Members;
