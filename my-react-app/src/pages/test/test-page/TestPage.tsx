import { useBreadcrumb } from '../../../components/breadcrum/Breadcrum';
import { BulbOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { Button, Tabs } from 'antd';
import TestQRCode from './components/QRCode';
import TestCalendar from './components/Calendar';

function Test() {
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([{ path: '/', icon: <BulbOutlined />, text: 'Test' }, { text: 'Tes Page' }]);
  }, []);
  const tabItems = [
    {
      label: `Test QR Code`,
      key: '1',
      children: <TestQRCode />
    },
    {
      label: `Test Calendar`,
      key: '2',
      children: <TestCalendar />
    },
    {
      label: `Tab 3`,
      key: '3',
      children: `Content of tab 3`
    }
  ];

  return (
    <div style={{ padding: 20, height: 2000 }}>
      <Tabs items={tabItems} tabBarExtraContent={<Button>Extra action</Button>} size="large" />
    </div>
  );
}

export default Test;
