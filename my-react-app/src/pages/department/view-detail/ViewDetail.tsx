import { useBreadcrumb } from '../../../components/breadcrum/Breadcrum';
import { GroupOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useEffect } from 'react';
import styles from './ViewDetail.module.scss';

//components
import Members from './components/Members/Members';
import Teams from './components/Teams/Teams';
import Tasks from './components/Tasks';
import Search from 'antd/es/input/Search';
import { useTranslation } from 'react-i18next';

function ViewDetail() {
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useTranslation();

  useEffect(() => {
    setBreadcrumb([{ path: '/', icon: <GroupOutlined />, text: t('department') }, { text: t('detail') }]);
  }, [t]);

  const tabItems = [
    {
      label: t('members'),
      key: '1',
      children: <Members />
    },
    {
      label: t('teams'),
      key: '2',
      children: <Teams />
    },
    {
      label: t('projects'),
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
        tabBarExtraContent={<Search placeholder={t('search')} allowClear onSearch={onSearch} style={{ width: 250 }} />}
        size="large"
      />
    </div>
  );
}

export default ViewDetail;
