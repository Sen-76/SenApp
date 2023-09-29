import { Menu, MenuProps } from 'antd';
import React, { useState, useEffect } from 'react';
import {
  ArrowRightOutlined,
  BulbOutlined,
  HddOutlined,
  SettingOutlined,
  AppstoreOutlined,
  SnippetsOutlined,
  BookOutlined
} from '@ant-design/icons';
import styles from './LeftNav.module.scss';
import { useNavigate, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

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

interface IProps {
  collapse?: boolean;
  onMenuClick?: (key: string) => void;
}

function LeftNav(props: IProps) {
  const [selectedKey, setSelectedKey] = useState<string[]>(['overview']);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const items: CustomMenuItem[] = [
    {
      label: t('dashboard'),
      path: '/',
      icon: renderIcon(AppstoreOutlined),
      key: 'dashboard'
    },
    {
      label: t('projects'),
      path: '/projects',
      icon: renderIcon(BookOutlined),
      key: 'projects'
    },
    {
      label: t('tasks'),
      path: '/tasks',
      icon: renderIcon(SnippetsOutlined),
      key: 'tasks'
    },
    {
      label: 'OKRs',
      icon: renderIcon(BulbOutlined),
      key: 'okrs',
      children: [
        {
          label: t('goals'),
          path: '/okrs/goals',
          icon: renderIcon(ArrowRightOutlined),
          key: 'goals'
        },
        {
          label: t('reviews'),
          path: '/okrs/reviews',
          icon: renderIcon(ArrowRightOutlined),
          key: 'reviews'
        },
        {
          label: t('feedbacks'),
          path: '/okrs/feedbacks',
          icon: renderIcon(ArrowRightOutlined),
          key: 'feedbacks'
        }
      ]
    },
    {
      label: t('test'),
      icon: renderIcon(BulbOutlined),
      key: 'test',
      children: [
        {
          label: t('test page'),
          path: '/test/test-page',
          icon: renderIcon(ArrowRightOutlined),
          key: 'testPage'
        },
        {
          label: t('test table'),
          path: '/test/test-table',
          icon: renderIcon(ArrowRightOutlined),
          key: 'testtable'
        },
        {
          label: t('test sorted table'),
          path: '/test/test-shortedtable',
          icon: renderIcon(ArrowRightOutlined),
          key: 'testshortedtable'
        },
        {
          label: t('test image'),
          path: '/test/test-image',
          icon: renderIcon(ArrowRightOutlined),
          key: 'testimage'
        }
      ]
    },
    {
      label: t('management'),
      icon: renderIcon(BulbOutlined),
      key: 'management',
      children: [
        {
          label: t('Manage_Department'),
          path: '/management/department-management',
          icon: renderIcon(ArrowRightOutlined),
          key: 'department'
        },
        {
          label: t('Manage_Account'),
          path: '/management/account-management',
          icon: renderIcon(ArrowRightOutlined),
          key: 'account-configuration'
        }
      ]
    },
    {
      label: 'Kanban',
      path: '/kanban',
      icon: renderIcon(HddOutlined),
      key: 'kanban'
    },
    {
      label: t('configuration'),
      icon: renderIcon(SettingOutlined),
      key: 'configuration',
      children: [
        {
          label: t('Configuration_File'),
          path: '/configuration/file-configuration',
          icon: renderIcon(ArrowRightOutlined),
          key: 'file-configuration'
        },
        {
          label: t('Configuration_Email'),
          path: '/configuration/email-configuration',
          icon: renderIcon(ArrowRightOutlined),
          key: 'email-configuration'
        },
        {
          label: `SMTP ${t('Configuration')}`,
          path: '/configuration/smtp-configuration',
          icon: renderIcon(ArrowRightOutlined),
          key: 'smtp-configuration'
        }
      ]
    }
  ];
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
      props?.onMenuClick?.(info.key);
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
      className={`${styles.leftNav} ${props.collapse && styles.expandLeftNav}`}
      selectedKeys={selectedKey}
      inlineCollapsed={props.collapse}
      inlineIndent={12}
      mode="inline"
      items={items as MenuItem[]}
      onClick={menuClick}
    />
  );
}

export default LeftNav;
