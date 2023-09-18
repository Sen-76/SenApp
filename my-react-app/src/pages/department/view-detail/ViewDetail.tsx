import { useBreadcrumb } from '../../../components/breadcrum/Breadcrum';
import { GroupOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import { useEffect } from 'react';
import styles from './ViewDetail.module.scss';

//components
import Members from './components/Members/Members';
import Teams from './components/Teams';
import Tasks from './components/Tasks';
import Search from 'antd/es/input/Search';

function ViewDetail() {
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb([{ path: '/', icon: <GroupOutlined />, text: 'Department' }, { text: 'Detail' }]);
  }, []);

  const tabItems = [
    {
      label: `Members`,
      key: '1',
      children: <Members />
    },
    {
      label: `Teams`,
      key: '2',
      children: <Teams />
    },
    {
      label: `Projects`,
      key: '3',
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
        tabBarExtraContent={<Search placeholder="Search" allowClear onSearch={onSearch} style={{ width: 250 }} />}
        size="large"
      />
    </div>
  );
}

export default ViewDetail;
