import { useRef } from 'react';
import DataTable from './components/DataTable';
import DetailPanel from './components/DetailPanel';

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

  const openDetailPanel = (data: A) => {
    (detailPanelRef.current as A).openDrawer(data);
  };

  return (
    <>
      <DataTable data={draftMembers} openPanel={openDetailPanel} />
      <DetailPanel refreshList={() => console.log('cc')} ref={detailPanelRef} />
    </>
  );
}

export default Members;
