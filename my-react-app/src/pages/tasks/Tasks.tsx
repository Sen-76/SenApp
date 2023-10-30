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
import FilterPanel from '../management/account/components/FilterPanel';

function Tasks() {
  const { setBreadcrumb } = useBreadcrumb();
  const initDataGrid: Common.IDataGrid = {
    pageInfor: {
      pageSize: 10,
      pageNumber: 1,
      totalItems: 0
    },
    searchInfor: {
      searchValue: '',
      searchColumn: ['summary']
    },
    filter: []
  };
  const [tabStatus, setTabStatus] = useState<string>('table');
  const [projectList, setProjectList] = useState<Project.IProjectModel[]>();
  const [taskList, setTaskList] = useState<A[]>([]);
  const [param, setParam] = useState<Common.IDataGrid>(initDataGrid);
  const { showLoading, closeLoading } = useLoading();
  const { t } = useTranslation();
  const panelRef = useRef();
  const filterPanelRef = useRef();
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

  const getTaskList = async (drafParam?: Common.IDataGrid) => {
    try {
      showLoading();
      const result = await service.taskService.get(drafParam ?? param);
      setTaskList(result.data);
    } catch (e) {
      console.log(e);
    } finally {
      closeLoading();
    }
  };

  const onChangeProject = (val: string) => {
    const draftParam = { ...param };
    if (draftParam.filter) {
      const project = draftParam.filter.findIndex((x) => x.key === 'projectId');
      project !== -1 && draftParam.filter.splice(project, 1);
      draftParam.filter.push({
        key: 'projectId',
        value: [val]
      });
    }
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
    const fetchApi = async () => {
      await getProjectList();
      await getTaskList();
    };
    fetchApi();
  }, []);

  const openPanel = (data?: A) => {
    (panelRef.current as A).openDrawer(data);
  };

  const openFilterPanel = (data?: A) => {
    (filterPanelRef.current as A).openDrawer(data);
  };

  const onSearch = (value: string) => {
    const draftGrid = { ...param };
    if (draftGrid.searchInfor) {
      draftGrid.searchInfor.searchValue = value;
    }
    draftGrid.pageInfor!.pageNumber = 1;
    setParam(draftGrid);
    getTaskList(draftGrid);
  };

  const onFilter = (val: A) => {
    const draftGrid = { ...param };
    if (draftGrid.filter) {
      const gender = draftGrid.filter.findIndex((x) => x.key === 'Gender');
      gender !== -1 && draftGrid.filter.splice(gender, 1);
      const department = draftGrid.filter.findIndex((x) => x.key === 'UserDepartment');
      department !== -1 && draftGrid.filter.splice(department, 1);
      const role = draftGrid.filter.findIndex((x) => x.key === 'UserRole');
      role !== -1 && draftGrid.filter.splice(role, 1);
      val.gender?.length > 0 &&
        draftGrid.filter.push({
          key: 'Gender',
          value: val.gender
        });
      val.role?.length > 0 &&
        draftGrid.filter.push({
          key: 'UserRole',
          value: val.role
        });
      val.department?.length > 0 &&
        draftGrid.filter.push({
          key: 'UserDepartment',
          value: val.department
        });
    }
    getTaskList(draftGrid);
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
            onSearch={onSearch}
            openFilterPanel={openFilterPanel}
            openDetailPanel={() => console.log('cc')}
            param={{}}
          />
        )}
        {tabStatus === 'kanban' && <Kanban />}
        <Panel refreshList={() => console.log('cc')} ref={panelRef} />
        <FilterPanel ref={filterPanelRef} onFilter={onFilter} />
      </div>
    </div>
  );
}

export default Tasks;
