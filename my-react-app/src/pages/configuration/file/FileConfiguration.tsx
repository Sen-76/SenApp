import { SettingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useBreadcrumb } from '../../../components/breadcrum/Breadcrum';
import styles from './FileConfiguration.module.scss';

//component
import DataTable from './components/DataTable';
import Panel from './components/Panel';

const fileList = [
  {
    id: 2,
    title: 'Avatar',
    fileSize: '5',
    fileAccept: ['jpg', 'png'],
    numberOfFile: 'single'
  },
  {
    id: 1,
    title: 'Attachment',
    fileSize: '15',
    fileAccept: ['pdf', 'png'],
    numberOfFile: 'multiple'
  }
];
function FileConfiguration() {
  const { t } = useTranslation();
  const { setBreadcrumb } = useBreadcrumb();
  const panelRef = useRef();

  useEffect(() => {
    setBreadcrumb([
      { icon: <SettingOutlined />, text: `${t('configuration')}` },
      { text: `${t('file configuration')}` }
    ]);
  }, [t]);

  const openPanel = (data?: A) => {
    (panelRef.current as A).openDrawer(data);
  };

  return (
    <div className={styles.fileconfiguration}>
      <DataTable data={fileList} openPanel={openPanel} />
      <Panel refreshList={() => console.log('refresh')} ref={panelRef} />
    </div>
  );
}

export default FileConfiguration;
