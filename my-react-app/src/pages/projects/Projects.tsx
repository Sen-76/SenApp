import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { BookOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import DataTable from './components/DataTable';
import styles from './Project.module.scss';

function Projects() {
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useTranslation();

  useEffect(() => {
    setBreadcrumb([{ icon: <BookOutlined />, text: t('projects') }]);
  }, [t]);
  return (
    <div className={styles.project}>
      <DataTable
        data={[]}
        openPanel={() => console.log('cc')}
        loading={false}
        openFilterPanel={() => console.log('cc')}
        param={{}}
      />
    </div>
  );
}

export default Projects;
