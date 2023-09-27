import { Avatar, Divider, Dropdown, MenuProps } from 'antd';
import { ImportOutlined, UserOutlined } from '@ant-design/icons';
import styles from './UserAvatar.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLoginManager } from '../../../common/helpers/login-manager';
import { util } from '@/common/helpers/util';

const draftUser = {
  photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
  userName: 'Sen',
  currentRole: {
    title: 'Admin đấy'
  }
};

function UserAvatar() {
  const { t } = useTranslation();
  const { loginOut } = useLoginManager();

  const menuStyle = {
    boxShadow: 'none'
  };

  const dropdownItem = () => {
    const items: MenuProps['items'] = [
      {
        label: (
          <Link to="/user/profile" className={styles.avatarDropdownItem}>
            <UserOutlined />
            <div className="dropdown-item-text">{t('profile')}</div>
          </Link>
        ),
        key: '1'
      },
      {
        label: (
          <div onClick={loginOut} className={styles.avatarDropdownItem}>
            <ImportOutlined />
            <div className="dropdown-item-text">{t('sign out')}</div>
          </div>
        ),
        key: '2'
      }
    ];
    return items;
  };
  return (
    <>
      <Dropdown
        menu={{ items: dropdownItem() }}
        trigger={['click']}
        placement="bottom"
        dropdownRender={(menu) => (
          <div
            style={{
              backgroundColor: '#ffffff',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px'
            }}
          >
            <div className={styles.avatarHeader}>
              <Avatar
                size={50}
                src={draftUser.photoUrl}
                style={{ marginRight: '16px', backgroundColor: util.randomColor() }}
              >
                {draftUser.userName.charAt(0)}
              </Avatar>
              <div className="avatar-header-content">
                <div className="avatar-header-name">{draftUser.userName}</div>
                <div className="avatar-header-role">{draftUser.currentRole?.title}</div>
              </div>
            </div>
            <Divider style={{ margin: 0 }} />
            {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
          </div>
        )}
      >
        <Avatar size={40} src={draftUser.photoUrl} style={{ cursor: 'pointer', backgroundColor: util.randomColor() }}>
          {draftUser.userName.charAt(0)}
        </Avatar>
      </Dropdown>
    </>
  );
}

export default UserAvatar;
