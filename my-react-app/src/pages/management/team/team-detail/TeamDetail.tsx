import { useLoading } from '@/common/context/useLoading';
import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { BulbOutlined } from '@ant-design/icons';
import Members from './components/members/Members';
import Projects from './components/Projects/Project';

function TeamDetail() {
  const { t } = useTranslation();
  const { showLoading, closeLoading } = useLoading();
  const [editData, setEditData] = useState<A>();
  const data = useParams();
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb([
      { icon: <BulbOutlined />, text: `${t('management')}` },
      { path: '/management/team-management', text: `${t('Manage_Team')}` },
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
      key: 'projects',
      label: t('projects'),
      children: <Projects />
    }
  ];
  return (
    <>
      <Tabs items={tabItems} size="large" />
    </>
  );
}

export default TeamDetail;
