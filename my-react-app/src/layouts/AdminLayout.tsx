import { Affix, Dropdown, Layout, MenuProps, Row, Tooltip } from 'antd';
import { IBreadcrumb, SiteBreadcrumb } from '../components/breadcrum/Breadcrum';
import UserAvatar from './components/user-avatar/UserAvatar';
import styles from './AdminLayout.module.scss';
import LeftNav from './components/left-navigation/LeftNav';
import { BellOutlined, CalendarOutlined, TranslationOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export interface IProps {
  children?: React.ReactNode;
  breadcrumbItems: IBreadcrumb[];
}
function AdminLayout(props: IProps) {
  const { Header, Content } = Layout;
  const { t } = useTranslation();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div style={{ minWidth: 150 }} onClick={() => i18next.changeLanguage('vn')}>
          Tiếng Việt
        </div>
      )
    },
    {
      key: '2',
      label: (
        <div style={{ minWidth: 150 }} onClick={() => i18next.changeLanguage('en')}>
          English
        </div>
      )
    }
  ];
  return (
    <>
      <Layout className={styles.siteLayout}>
        <div className={styles.lefNav}>
          <LeftNav></LeftNav>
        </div>
        <Layout className={styles.rightLayout}>
          <Affix offsetTop={0}>
            <Header style={{ padding: '0 20px', background: '#fff', borderBottom: `1px solid #EEF2F5` }}>
              <Row style={{ height: '100%' }} justify="space-between" align="middle">
                <div>
                  <SiteBreadcrumb items={props.breadcrumbItems}></SiteBreadcrumb>
                </div>
                <div className={styles.rightHeader}>
                  <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
                    <Tooltip placement="bottom" title={`${t('language')}`} arrow={true}>
                      <TranslationOutlined />
                    </Tooltip>
                  </Dropdown>
                  <Tooltip placement="bottom" title={`${t('calendar')}`} arrow={true}>
                    <CalendarOutlined />
                  </Tooltip>
                  <Tooltip placement="bottom" title={`${t('notification')}`} arrow={true}>
                    <BellOutlined />
                  </Tooltip>
                  <UserAvatar />
                </div>
              </Row>
            </Header>
          </Affix>
          <Content className={styles.content}>
            <div>{props.children}</div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default AdminLayout;
