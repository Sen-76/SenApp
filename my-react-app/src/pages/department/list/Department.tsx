import { useEffect, useRef } from 'react';
import { GroupOutlined } from '@ant-design/icons';
import { useBreadcrumb } from '../../../components/breadcrum/Breadcrum';
import styles from './Department.module.scss';

import Panel from './components/Panel';
import DataTable from './components/DataTable';

const draftDepartment = [
  {
    id: 1,
    title: 'Test 1',
    description: 'Nan'
  },
  {
    id: 2,
    title: 'Test 2',
    description: 'Nan'
  }
];
function Department() {
  const { setBreadcrumb } = useBreadcrumb();
  const panelRef = useRef();

  useEffect(() => {
    setBreadcrumb([{ icon: <GroupOutlined />, text: 'Department' }]);
  }, []);

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
