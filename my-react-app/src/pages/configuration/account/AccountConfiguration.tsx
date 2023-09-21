import { useBreadcrumb } from '../../../components/breadcrum/Breadcrum';
import { SettingOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import styles from './AccountConfiguration.module.scss';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { useLoading } from '../../../common/context/useLoading';

//components
import DataTable from './components/DataTable';
import Panel from './components/Panel';
import FilterPanel from './components/FilterPanel';
import DetailPanel from './components/DetailPanel';

const accountList = [
  {
    key: 2,
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    fullName: 'Sen',
    userName: 'Sen',
    phone: '0344382294',
    dob: '07/06/2001',
    gender: 'Male',
    email: 'sen76201@gmail.com',
    stars: 500,
    department: 'Tester',
    job: 'Tester',
    status: 'Active',
    role: 'Admin'
  },
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
    job: 'Tester',
    status: 'Active',
    role: 'Admin'
  }
];
function AccountConfiguration() {
  const { setBreadcrumb } = useBreadcrumb();
  const { showLoading, closeLoading } = useLoading();
  const [tabStatus, setTabStatus] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const panelRef = useRef();
  const filterPanelRef = useRef();
  const detailPanelRef = useRef();
  const { t } = useTranslation();

  const tabItems = [
    {
      label: t('Configuration_Account_WorkingUser'),
      key: '1'
    },
    {
      label: t('Configuration_Account_DeletedUser'),
      key: '2'
    }
  ];

  useEffect(() => {
    getAccountsList();
    setBreadcrumb([
      { icon: <SettingOutlined />, text: `${t('configuration')}` },
      { text: `${t('Configuration_Account')}` }
    ]);
  }, [t]);

  const getAccountsList = async () => {
    showLoading();
    setLoading(true);
    const timeout = setTimeout(() => {
      closeLoading();
      setLoading(false);
      clearTimeout(timeout);
    }, 2000);
  };

  const openPanel = (data?: A) => {
    (panelRef.current as A).openDrawer(data);
  };

  const openDetailPanel = (data?: A) => {
    (detailPanelRef.current as A).openDrawer(data);
  };

  const openFilterPanel = (data?: A) => {
    (filterPanelRef.current as A).openDrawer(data);
  };

  const onTabChanged = (e: A) => {
    setTabStatus(e);
    getAccountsList();
  };

  return (
    <div className={styles.accountconfiguration}>
      <Tabs items={tabItems} size="large" onChange={onTabChanged} />
      <DataTable
        data={accountList}
        openPanel={openPanel}
        openFilterPanel={openFilterPanel}
        openDetailPanel={openDetailPanel}
        tabStatus={tabStatus}
        refreshList={getAccountsList}
        loading={loading}
      />
      <Panel refreshList={getAccountsList} ref={panelRef} />
      <FilterPanel refreshList={getAccountsList} ref={filterPanelRef} />
      <DetailPanel refreshList={getAccountsList} ref={detailPanelRef} />
    </div>
  );
}

export default AccountConfiguration;
