import { Avatar, Divider, Dropdown, MenuProps } from 'antd';
import { ImportOutlined, UserOutlined } from '@ant-design/icons';
import styles from './UserAvatar.module.scss';
import React from 'react';

const draftUser = {
  photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
  userName: 'Sen',
  currentRole: {
    title: 'Admin đấy'
  }
};

function UserAvatar() {
  const loginOut = () => {
    console.log('logout');
  };

  const menuStyle = {
    boxShadow: 'none'
  };

  const dropdownItem = () => {
    const items: MenuProps['items'] = [
      {
        label: (
          <div onClick={loginOut} className={styles.avatarDropdownItem}>
            <ImportOutlined />
            <div className="dropdown-item-text">Sign out</div>
          </div>
        ),
        key: '1'
      }
    ];
    //   if (currentRoleList.length > 1 && location.pathname !== '/selectrole') {
    //     items.unshift({
    //       label: (
    //         <div onClick={selectRoleClick}>
    //           <UserSwitchOutlined />
    //           <div className="dropdown-item-text">Select Role</div>
    //         </div>
    //       ),
    //       key: '2'
    //     });
    //   }
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
              <Avatar size={50} src={draftUser.photoUrl} style={{ marginRight: '16px' }}>
                {draftUser.userName.split('')[0]}
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
        <Avatar size={40} src={draftUser.photoUrl}>
          {draftUser.userName.split('')[0]}
        </Avatar>
      </Dropdown>
    </>
  );
}

export default UserAvatar;
