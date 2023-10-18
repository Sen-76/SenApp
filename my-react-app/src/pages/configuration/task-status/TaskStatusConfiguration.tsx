import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { SettingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import styles from './TaskStatusConfiguration.module.scss';
import DataList from './components/DataList';
import Panel from './components/Panel';

const drafStatus = [
  {
    title: 'ok',
    description: 'cc',
    color: '#CA9595',
    deleteable: false
  },
  {
    title: 'dm',
    description: 'cc',
    color: '#F7F600',
    deleteable: true
  }
];
function TaskStatus() {
  const { t } = useTranslation();
  const { setBreadcrumb } = useBreadcrumb();
  const panelRef = useRef();

  useEffect(() => {
    setBreadcrumb([
      { icon: <SettingOutlined />, text: `${t('configuration')}` },
      { text: `${t('Configuration_Task_Status')}` }
    ]);
  }, [t]);

  const openPanel = (data?: A) => {
    (panelRef.current as A).openDrawer(data);
  };

  return (
    <div className={styles.taskstatus}>
      <DataList data={drafStatus} openPanel={openPanel} />
      <Panel ref={panelRef} refreshList={() => console.log('dm')} />
    </div>
  );
}

export default TaskStatus;
