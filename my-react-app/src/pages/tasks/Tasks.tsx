import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { SnippetsOutlined } from '@ant-design/icons';
import { Select, Tabs } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './Task.module.scss';
import DataTable from './components/DataTable';
import { useTranslation } from 'react-i18next';
import Panel from './components/Panel';
import Kanban from './components/Kanban';
import { service } from '@/services/apis';
import { EStatus } from '../projects/list/Project.model';
import { useLoading } from '@/common/context/useLoading';

const draftTask = [
  {
    id: '1',
    title: 'MKTPMS Marketing Project Management System',
    assignee: 'Sen',
    reportTo: 'Elwyn'
  }
];

function Tasks() {
  const { setBreadcrumb } = useBreadcrumb();
  const [tabStatus, setTabStatus] = useState<string>('table');
  const [projectList, setProjectList] = useState<Project.IProjectModel[]>();
  const { showLoading, closeLoading } = useLoading();
  const { t } = useTranslation();
  const panelRef = useRef();
  const tabItems = [
    {
      label: t('Task_Table_View'),
      key: 'table'
    },
    {
      label: t('Task_Kanban_View'),
      key: 'kanban'
    }
  ];
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
    filter: [{ key: 'Status', value: [EStatus.Active] }]
  };

  const getProjectList = async () => {
    try {
      showLoading();
      const result = await service.projectService.get(initDataGrid);
      setProjectList(result.data.map((x: A) => ({ label: x.title, value: x.id })));
    } catch (e) {
      console.log(e);
    } finally {
      closeLoading();
    }
  };

  const onChangeProject = (val: string) => {
    console.log(val);
  };

  const onTabChanged = (e: A) => {
    setTabStatus(e);
  };

  useEffect(() => {
    setBreadcrumb([{ icon: <SnippetsOutlined />, text: t('Common_Task') }]);
  }, [t]);

  useEffect(() => {
    getProjectList();
  }, []);

  const openPanel = (data?: A) => {
    (panelRef.current as A).openDrawer(data);
  };

  return (
    <div className={styles.tasks}>
      <div>
        <Select
          className={styles.select}
          placeholder={t('Task_Select_Project')}
          options={projectList}
          onChange={onChangeProject}
        />
        <Tabs items={tabItems} size="large" onChange={onTabChanged} />
        {tabStatus === 'table' && (
          <DataTable
            data={draftTask}
            openPanel={openPanel}
            loading={false}
            openFilterPanel={() => console.log('cc')}
            openDetailPanel={() => console.log('cc')}
            param={{}}
          />
        )}
        {tabStatus === 'kanban' && <Kanban />}
        <Panel refreshList={() => console.log('cc')} ref={panelRef} />
      </div>
    </div>
  );
}

export default Tasks;
