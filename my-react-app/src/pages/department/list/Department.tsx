import { useEffect, useRef } from 'react';
import { GroupOutlined } from '@ant-design/icons';
import { useBreadcrumb } from '../../../components/breadcrum/Breadcrum';
import styles from './Department.module.scss';

import Panel from './components/Panel';
import DataTable from './components/DataTable';
import { useTranslation } from 'react-i18next';

const draftDepartment = [
  {
    id: 1,
    title: 'Test 1',
    description: 'Nan',
    updatedDate: '2012/12/12 12:12:12',
    modifiedBy: 'Sen'
  },
  {
    id: 2,
    title: 'Test 2',
    description: 'Nan',
    updatedDate: '2012/12/12 12:12:12',
    modifiedBy: 'Sen'
  }
];
function Department() {
  const { setBreadcrumb } = useBreadcrumb();
  const panelRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    setBreadcrumb([{ icon: <GroupOutlined />, text: t('department') }]);
  }, [t]);

  const openPanel = (data?: A) => {
    (panelRef.current as A).openDrawer(data);
  };

  return (
    <div className={styles.department}>
      <DataTable data={draftDepartment} openPanel={openPanel} />
      <Panel refreshList={() => console.log('refresh list')} ref={panelRef} />
    </div>
  );
}

export default Department;
