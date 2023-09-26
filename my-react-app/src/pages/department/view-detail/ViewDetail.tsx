import { useBreadcrumb } from '../../../components/breadcrum/Breadcrum';
import { GroupOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useEffect } from 'react';
import styles from './ViewDetail.module.scss';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

//components
import Members from './components/Members/Members';
import Teams from './components/Teams/Teams';
import Project from './components/Projects/Project';

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
      key: 'members',
      label: t('members'),
      children: <Members />
    },
    {
      key: 'teams',
      label: t('teams'),
      children: <Teams />
    },
    {
      key: 'projects',
      label: t('projects'),
      children: <Project />
    }
  ];

  return (
    <div className={styles.viewdetail}>
      <Tabs items={tabItems} size="large" />
    </div>
  );
}

export default ViewDetail;
