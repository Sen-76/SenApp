import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { BookOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import styles from './ProjectDetail.module.scss';
import Milestone from './components/MIlestone';

function ProjectDetail() {
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useTranslation();
  const data = useParams();

  useEffect(() => {
    setBreadcrumb([{ icon: <BookOutlined />, text: t('projects'), path: '/projects' }, { text: data.name }]);
  }, [t]);

  const tabItems = [
    {
      key: 'milestone',
      label: t('Project_Milestone'),
      children: <Milestone />
    }
  ];
  return (
    <div className={styles.projectdetail}>
      <Tabs items={tabItems} size="large" />
    </div>
  );
}

export default ProjectDetail;
