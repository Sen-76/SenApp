import { useRef, useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import DetailPanel from './components/DetailPanel';
import Panel from './components/Panel';
import { useLoading } from '@/common/context/useLoading';
import { useParams } from 'react-router';
import { service } from '@/services/apis';

const draftTeams = [
  {
    id: 1,
    name: 'Team no hope',
    description: 'N/A',
    members: [
      {
        id: 1,
        fullName: 'Sen 1',
        job: 'Developer',
        gender: 'Male',
        photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
        description: 'N/A'
      },
      {
        id: 2,
        fullName: 'Sen 2',
        job: 'Developer',
        gender: 'Male',
        photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
        description: 'N/A'
      },
      {
        id: 3,
        fullName: 'Sen 3',
        job: 'Developer',
        gender: 'Male',
        photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
        description: 'N/A'
      },
      {
        id: 4,
        fullName: 'Sen 4',
        job: 'Developer',
        gender: 'Male',
        photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
        description: 'N/A'
      },
      {
        id: 5,
        fullName: 'Sen 5',
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
  const [loading, setLoading] = useState<boolean>(false);
  const [teamList, setTeamList] = useState<Account.IAccountModel[]>([]);
  const data = useParams();
  const initDataGrid: Common.IDataGrid = {
    pageInfor: {
      pageSize: 10,
      pageNumber: 1,
      totalItems: 0
    },
    searchInfor: {
      searchValue: '',
      searchColumn: ['Title']
    },
    filter: [
      // { key: 'Status', value: [EState.Activate] },
      { key: 'DepartmentId', value: [data.id] }
    ]
  };
  const [param, setParam] = useState<Common.IDataGrid>(initDataGrid);

  useEffect(() => {
    getTeams();
  }, []);

  const openPanel = (data: A) => {
    (panelRef.current as A).openDrawer(data);
  };

  const openDetailPanel = (data: A) => {
    (detailPanelRef.current as A).openDrawer(data);
  };

  const onSearch = (value: string) => {
    const draftGrid = { ...param };
    if (draftGrid.searchInfor) {
      draftGrid.searchInfor.searchValue = value;
    }
    draftGrid.pageInfor!.pageNumber = 1;
    setParam(draftGrid);
    getTeams(draftGrid);
  };

  const setPage = (val: number) => {
    const draftGrid = { ...param };
    if (draftGrid.pageInfor) {
      draftGrid.pageInfor.pageNumber = val;
    }
    setParam(draftGrid);
    getTeams(draftGrid);
  };

  const getTeams = async (draftParam?: Common.IDataGrid) => {
    try {
      setLoading(true);
      const result = await service.teamService.get(draftParam ?? param);
      setParam({
        ...param,
        pageInfor: {
          pageSize: result.prameter.pageSize,
          pageNumber: result.prameter.pageNumber,
          totalItems: result.prameter.totalItems
        }
      });
      setTeamList(result.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <DataTable
        data={draftTeams}
        openPanel={openPanel}
        openDetailPanel={openDetailPanel}
        refreshList={getTeams}
        loading={loading}
        param={param}
        onSearch={onSearch}
        setPage={setPage}
      />
      <DetailPanel refreshList={getTeams} openPanel={openPanel} ref={detailPanelRef} />
      <Panel refreshList={getTeams} ref={panelRef} />
    </>
  );
}

export default Teams;
