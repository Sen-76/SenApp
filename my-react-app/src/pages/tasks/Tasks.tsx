import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { SnippetsOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useEffect } from 'react';
import styles from './Task.module.scss';

function Tasks() {
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([{ icon: <SnippetsOutlined />, text: 'Task' }]);
  }, []);
  return (
    <div className={styles.tasks}>
      <div>
        Project: <Select className={styles.select} />
      </div>
    </div>
  );
}

export default Tasks;
