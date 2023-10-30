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
import { useLoading } from '@/common/context/useLoading';

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
  filter: []
};
function Tasks() {
  const { setBreadcrumb } = useBreadcrumb();
  const [tabStatus, setTabStatus] = useState<string>('table');
  const [projectList, setProjectList] = useState<Project.IProjectModel[]>([]);
  const [taskList, setTaskList] = useState<Project.IProjectModel[]>([]);
  const [param, setParam] = useState<Common.IDataGrid>(initDataGrid);
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

  const getProjectList = async () => {
    try {
      showLoading();
      const result = await service.projectService.get({
        pageInfor: {
          pageSize: 100,
          pageNumber: 1,
          totalItems: 0
        }
      });
      setProjectList(result.data.map((x: A) => ({ label: x.title, value: x.id })));
    } catch (e) {
      console.log(e);
    } finally {
      closeLoading();
    }
  };

  const getTaskList = async (draftParam?: Common.IDataGrid) => {
    try {
      showLoading();
      const result = await service.taskService.get(draftParam ?? param);
      setTaskList(result.data);
    } catch (e) {
      console.log(e);
    } finally {
      closeLoading();
    }
  };

  const onChangeProject = (val: string) => {
    const draftParam = { ...initDataGrid };
    draftParam.filter = [{ key: 'ProjectId', value: [val] }];
    setParam(draftParam);
    getTaskList(draftParam);
  };

  const onTabChanged = (e: A) => {
    setTabStatus(e);
  };

  useEffect(() => {
    setBreadcrumb([{ icon: <SnippetsOutlined />, text: t('Common_Task') }]);
  }, [t]);

  useEffect(() => {
    const fetchData = async () => {
      await getTaskList();
      await getProjectList();
    };

    fetchData();
  }, []);

  const openPanel = (data?: A) => {
    (panelRef.current as A).openDrawer(data);
  };

  return (
    <div className={styles.tasks}>
      <div>
        <Tabs
          items={tabItems}
          size="large"
          onChange={onTabChanged}
          tabBarExtraContent={
            <Select
              className={styles.select}
              placeholder={t('Task_Select_Project')}
              options={projectList}
              onChange={onChangeProject}
            />
          }
        />
        {tabStatus === 'table' && (
          <DataTable
            data={taskList}
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
