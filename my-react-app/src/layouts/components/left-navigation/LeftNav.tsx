import { Menu, MenuProps } from 'antd';
import React, { useState, useEffect } from 'react';
import { BarsOutlined, ArrowRightOutlined, BulbOutlined, HddOutlined } from '@ant-design/icons';
import styles from './LeftNav.module.scss';
import { useNavigate, useLocation } from 'react-router';

type MenuItem = Required<MenuProps>['items'][number];
type CustomMenuItem = MenuItem & { path?: string; children?: CustomMenuItem[] };
interface IMenuClickEvent {
  key: string;
  keyPath: string[];
}

const renderIcon = (icon: A) => {
  return React.createElement(icon, {
    style: {
      fontSize: 16
    }
  });
};

const items: CustomMenuItem[] = [
  {
    label: 'Overview',
    path: '/',
    icon: renderIcon(BarsOutlined),
    key: 'overview'
  },
  {
    label: 'Test',
    icon: renderIcon(BulbOutlined),
    key: 'dormmanagement',
    children: [
      {
        label: 'Test Page',
        path: '/test/test-page',
        icon: renderIcon(ArrowRightOutlined),
        key: 'testPage'
      },
      {
        label: 'Test Table',
        path: '/test/test-table',
        icon: renderIcon(ArrowRightOutlined),
        key: 'testtable'
      },
      {
        label: 'Test Shorted Table',
        path: '/test/test-shortedtable',
        icon: renderIcon(ArrowRightOutlined),
        key: 'testshortedtable'
      },
      {
        label: 'Test Image',
        path: '/test/test-image',
        icon: renderIcon(ArrowRightOutlined),
        key: 'testimage'
      }
    ]
  },
  {
    label: 'Kanban',
    path: '/kanban',
    icon: renderIcon(HddOutlined),
    key: 'kanban'
  }
];

function LeftNav() {
  const [selectedKey, setSelectedKey] = useState<string[]>(['overview']);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;
    const activeKey = findItemNodeByKeyOrPath('path', pathName);
    if (activeKey) {
      setSelectedKey([activeKey.key as string]);
    }
  }, []);

  const menuClick = (info: IMenuClickEvent) => {
    if (info.key) {
      setSelectedKey([info.key]);
      const path = findItemNodeByKeyOrPath('key', info.key)?.path;
      path && navigate(path);
    }
  };

  const findItemNodeByKeyOrPath = (key: 'key' | 'path', keyValue: string): CustomMenuItem | null => {
    if (!items || !keyValue) return null;
    const treeList = [...items];
    while (treeList.length > 0) {
      const treeItem = treeList.shift();
      if (!treeItem) return null;
      if (treeItem[key] === keyValue) {
        return treeItem;
      }
      treeItem.children?.forEach((child) => {
        treeList.push(child as CustomMenuItem);
      });
    }
    return null;
  };

  return (
    <Menu
      className={styles.leftNav}
      selectedKeys={selectedKey}
      inlineIndent={12}
      mode="inline"
      items={items as MenuItem[]}
      onClick={menuClick}
    />
  );
}

export default LeftNav;
