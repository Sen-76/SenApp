import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { SnippetsOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useEffect } from 'react';

function Tasks() {
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([{ icon: <SnippetsOutlined />, text: 'Task' }]);
  }, []);
  return (
    <>
      <div>
        Project: <Select />
      </div>
    </>
  );
}

export default Tasks;
