import { useBreadcrumb } from '../../../components/breadcrum/Breadcrum';
import { GroupOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useEffect } from 'react';
import styles from './ViewDetail.module.scss';
import Search from 'antd/es/input/Search';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

//components
import Members from './components/Members/Members';
import Teams from './components/Teams/Teams';
import Tasks from './components/Tasks';

function ViewDetail() {
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    setBreadcrumb([
      { path: '/department', icon: <GroupOutlined />, text: t('department') },
      { text: decodeURIComponent(location.pathname.split('/')[location.pathname.split('/').length - 2]) }
    ]);
  }, [t]);

  const tabItems = [
    {
      key: '1', // Unique key
      label: t('members'),
      children: <Members />
    },
    {
      key: '2', // Unique key
      label: t('teams'),
      children: <Teams />
    },
    {
      key: '3', // Unique key
      label: t('projects'),
      children: <Tasks />
    }
  ];

  const onSearch = () => {
    console.log('onSearch');
  };

  return (
    <div className={styles.viewdetail}>
      <Tabs
        items={tabItems}
        tabBarExtraContent={<Search placeholder={t('search')} allowClear onSearch={onSearch} style={{ width: 250 }} />}
        size="large"
      />
    </div>
  );
}

export default ViewDetail;
