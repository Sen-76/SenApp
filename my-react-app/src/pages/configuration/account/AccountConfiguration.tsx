import { useBreadcrumb } from '../../../components/breadcrum/Breadcrum';
import { SettingOutlined } from '@ant-design/icons';
import { useEffect, useRef } from 'react';
import styles from './AccountConfiguration.module.scss';

//components
import DataTable from './components/DataTable';
import Panel from './components/Panel';
import FilterPanel from './components/FilterPanel';

const accountList = [
  {
    key: 1,
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    fullName: 'Sen',
    userName: 'Sen',
    phone: '0344382294',
    dob: '07/06/2001',
    gender: 'Male',
    email: 'sen76201@gmail.com',
    stars: 500,
    department: 'Tester',
    status: 'Active',
    role: 'Admin'
  }
];
function AccountConfiguration() {
  const { setBreadcrumb } = useBreadcrumb();
  const panelRef = useRef();
  const filterPanelRef = useRef();
  useEffect(() => {
    setBreadcrumb([{ icon: <SettingOutlined />, text: 'Configuration' }, { text: 'Account Configuration' }]);
  }, []);
  const openPanel = (data?: A) => {
    (panelRef.current as A).openDrawer(data);
  };
  const openFilterPanel = (data?: A) => {
    (filterPanelRef.current as A).openDrawer(data);
  };
  const refreshList = () => {
    console.log('data refresed');
  };
  return (
    <div className={styles.accountconfiguration}>
      <DataTable data={accountList} openPanel={openPanel} openFilterPanel={openFilterPanel} />
      <Panel refreshList={refreshList} ref={panelRef} />
      <FilterPanel refreshList={refreshList} ref={filterPanelRef} />
    </div>
  );
}

export default AccountConfiguration;
