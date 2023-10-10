import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { SnippetsOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useEffect, useRef } from 'react';
import styles from './Task.module.scss';
import DataTable from './components/DataTable';
import { useTranslation } from 'react-i18next';
import Panel from './components/Panel';
import Kanban from './components/Kanban';

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
  const { t } = useTranslation();
  const panelRef = useRef();

  useEffect(() => {
    setBreadcrumb([{ icon: <SnippetsOutlined />, text: 'Task' }]);
  }, []);

  const openPanel = (data?: A) => {
    (panelRef.current as A).openDrawer(data);
  };

  return (
    <div className={styles.tasks}>
      <div>
        <Select className={styles.select} placeholder={t('Task_Select_Project')} />
        <DataTable
          data={draftTask}
          openPanel={openPanel}
          loading={false}
          openFilterPanel={() => console.log('cc')}
          openDetailPanel={() => console.log('cc')}
          param={{}}
        />
        <Panel refreshList={() => console.log('cc')} ref={panelRef} />
        <Kanban />
      </div>
    </div>
  );
}

export default Tasks;
