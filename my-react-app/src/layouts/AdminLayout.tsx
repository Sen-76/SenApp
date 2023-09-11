import { Affix, Layout, Row } from 'antd';
import { IBreadcrumb, SiteBreadcrumb } from '../components/breadcrum/Breadcrum';
import UserAvatar from './components/user-avatar/UserAvatar';
const { Header, Content } = Layout;
import styles from './AdminLayout.module.scss';
import LeftNav from './components/left-navigation/LeftNav';

export interface IProps {
  children?: React.ReactNode;
  breadcrumbItems: IBreadcrumb[];
}
function AdminLayout(props: IProps) {
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
                <UserAvatar />
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
