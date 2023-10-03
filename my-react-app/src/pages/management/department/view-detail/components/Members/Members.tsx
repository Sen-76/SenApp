import { useRef, useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import DetailPanel from './components/DetailPanel';
import Panel from './components/Panel';
import { useLoading } from '@/common/context/useLoading';

const draftMembers = [
  {
    id: 1,
    key: 1,
    fullName: 'Sen',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg'
  },
  {
    id: 2,
    key: 2,
    fullName: 'Sen',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg'
  }
];
function Members() {
  const detailPanelRef = useRef();
  const panelRef = useRef();
  const { showLoading, closeLoading } = useLoading();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getMembers();
  }, []);

  const openDetailPanel = (data: A) => {
    (detailPanelRef.current as A).openDrawer(data);
  };

  const openPanel = () => {
    (panelRef.current as A).openDrawer();
  };

  const getMembers = () => {
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
        data={draftMembers}
        openPanel={openPanel}
        openDetailPanel={openDetailPanel}
        refreshList={getMembers}
        loading={loading}
      />
      <DetailPanel refreshList={getMembers} openPanel={openPanel} ref={detailPanelRef} />
      <Panel refreshList={getMembers} ref={panelRef} />
    </>
  );
}

export default Members;
