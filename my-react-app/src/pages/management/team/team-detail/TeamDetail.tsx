import { useLoading } from '@/common/context/useLoading';
import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { Col, Collapse, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { BulbOutlined } from '@ant-design/icons';
import Members from './components/members/Members';
import Projects from './components/Projects/Project';
import styles from './TeamDetail.module.scss';
import { service } from '@/services/apis';

function TeamDetail() {
  const { t } = useTranslation();
  const { showLoading, closeLoading } = useLoading();
  const [editData, setEditData] = useState<A>();
  const data = useParams();
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb([
      { icon: <BulbOutlined />, text: `${t('management')}` },
      { path: '/management/team-management', text: `${t('Manage_Team')}` },
      { text: decodeURIComponent(location.pathname.split('/')[location.pathname.split('/').length - 2]) }
    ]);
  }, [t]);

  useEffect(() => {
    getTeamDetail();
  }, []);

  const tabItems = [
    {
      key: 'members',
      label: t('members'),
      children: <Members />
    },
    {
      key: 'projects',
      label: t('projects'),
      children: <Projects />
    }
  ];

  const getTeamDetail = async () => {
    try {
      showLoading();
      const result = await service.teamService.getDetail(data.id ?? '');
      setEditData(result.data);
      closeLoading();
    } catch (e) {
      console.log(e);
    } finally {
      closeLoading();
    }
  };

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
                    <Col className={styles.keyCol}>{t('Department_Name')}</Col>
                    <Col className={styles.valueCol}>{editData?.title}</Col>
                  </Row>
                  <Row className={styles.detailRow}>
                    <Col className={styles.keyCol}>{t('Team_Department')}</Col>
                    <Col className={styles.valueCol}>{editData?.department.title}</Col>
                  </Row>
                  <Row className={styles.detailRow}>
                    <Col className={styles.keyCol}>{t('Team_Leader')}</Col>
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

export default TeamDetail;
