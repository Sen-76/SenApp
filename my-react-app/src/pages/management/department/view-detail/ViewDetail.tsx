import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { BulbOutlined } from '@ant-design/icons';
import { Col, Collapse, Row, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import styles from './ViewDetail.module.scss';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';
import { service } from '@/services/apis';
import { useLoading } from '@/common/context/useLoading';

//components
import Members from './components/Members/Members';
import Teams from './components/Teams/Teams';
import Project from './components/Projects/Project';

function ViewDetail() {
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useTranslation();
  const location = useLocation();
  const data = useParams();
  const { showLoading, closeLoading } = useLoading();
  const [editData, setEditData] = useState<A>();

  useEffect(() => {
    setBreadcrumb([
      { icon: <BulbOutlined />, text: `${t('management')}` },
      { path: '/management/department-management', text: `${t('Manage_Department')}` },
      { text: decodeURIComponent(location.pathname.split('/')[location.pathname.split('/').length - 2]) }
    ]);
  }, [t]);

  useEffect(() => {
    getUserDetail(data.id ?? '');
  }, []);

  const getUserDetail = async (id: string) => {
    try {
      showLoading();
      const { data } = await service.departmentService.getDetail(id);
      setEditData(data);
    } catch (e) {
      console.log(e);
    } finally {
      closeLoading();
    }
  };
  const tabItems = [
    {
      key: 'members',
      label: t('members'),
      children: <Members />
    },
    {
      key: 'teams',
      label: t('teams'),
      children: <Teams />
    },
    {
      key: 'projects',
      label: t('projects'),
      children: <Project />
    }
  ];

  return (
    <div className={styles.viewdetail}>
      <Collapse
        defaultActiveKey={['1']}
        items={[
          {
            key: '1',
            label: t('General_Information'),
            children: (
              <Row style={{ display: 'flex', gap: 10 }}>
                <Col style={{ width: 'calc(50% - 10px)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Row className={styles.detailRow}>
                    <Col className={styles.keyCol}>{t('Common_Title')}</Col>
                    <Col className={styles.valueCol}>{editData?.title}</Col>
                  </Row>
                  <Row className={styles.detailRow}>
                    <Col className={styles.keyCol}>{t('Department_Manger')}</Col>
                    <Col className={styles.valueCol}>{editData?.manager.fullName}</Col>
                  </Row>
                </Col>
                <Col style={{ width: '50%' }}>
                  <Row className={styles.detailRow} style={{ height: '100%' }}>
                    <Col className={styles.keyCol} style={{ height: '100%' }}>
                      {t('Common_Description')}
                    </Col>
                    <Col
                      className={styles.valueCol}
                      style={{ width: 'calc(100% - 110px)', lineHeight: '20px', paddingTop: 10 }}
                    >
                      {editData?.description}
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          }
        ]}
      />

      <Tabs items={tabItems} size="large" />
    </div>
  );
}

export default ViewDetail;
