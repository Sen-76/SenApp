import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { BookOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import DataTable from './components/DataTable';
import styles from './Project.module.scss';
import Panel from './components/Panel';
import FilterPanel from './components/FilterPanel';

const draftProject = [
  {
    id: '1',
    title: 'MKTPMS Marketing Project Management System',
    team: 'Sen',
    department: 'Elwyn',
    startdate: '10/10/2012',
    duedate: '10/10/2013',
    status: 0
  }
];

function Projects() {
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useTranslation();
  const panelRef = useRef();
  const filterPanelRef = useRef();

  useEffect(() => {
    setBreadcrumb([{ icon: <BookOutlined />, text: t('projects') }]);
  }, [t]);

  const openPanel = (data?: A) => {
    (panelRef.current as A).openDrawer(data);
  };

  const openFilterPanel = (data?: A) => {
    (filterPanelRef.current as A).openDrawer(data);
  };

  return (
    <div className={styles.project}>
      <DataTable
        data={draftProject}
        openPanel={openPanel}
        loading={false}
        openFilterPanel={openFilterPanel}
        param={{}}
      />
      <Panel ref={panelRef} refreshList={() => console.log('dm')} />
      <FilterPanel ref={filterPanelRef} filterAccount={() => console.log('cc')} />
    </div>
  );
}

export default Projects;
