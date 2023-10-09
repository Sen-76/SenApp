import { useRef, useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import DetailPanel from './components/DetailPanel';
import Panel from './components/Panel';
import { service } from '@/services/apis';
import { EState } from '@/pages/management/account/AccountManagement.Model';

function Members() {
  const initDataGrid: Common.IDataGrid = {
    pageInfor: {
      pageSize: 10,
      pageNumber: 1,
      totalItems: 0
    },
    searchInfor: {
      searchValue: '',
      searchColumn: ['FullName']
    },
    filter: [
      { key: 'Status', value: [EState.Activate] }
      // { key: 'Department', value: param }
    ]
  };
  const detailPanelRef = useRef();
  const panelRef = useRef();
  const [loading, setLoading] = useState<boolean>(false);
  const [memberList, setMemberList] = useState<Account.IAccountModel[]>([]);
  const [param, setParam] = useState<Common.IDataGrid>(initDataGrid);

  useEffect(() => {
    getMembers();
  }, []);

  const openDetailPanel = (data: A) => {
    (detailPanelRef.current as A).openDrawer(data);
  };

  const openPanel = () => {
    (panelRef.current as A).openDrawer();
  };

  const getMembers = async (draftParam?: Common.IDataGrid) => {
    try {
      setLoading(true);
      const result = await service.accountService.getAccount(draftParam ?? param);
      setParam({
        ...param,
        pageInfor: {
          pageSize: result.prameter.pageSize,
          pageNumber: result.prameter.pageNumber,
          totalItems: result.prameter.totalItems
        }
      });
      setMemberList(result.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <DataTable
        data={memberList}
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
