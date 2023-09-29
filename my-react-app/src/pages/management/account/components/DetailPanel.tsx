import {
  CalendarOutlined,
  CloseOutlined,
  CoffeeOutlined,
  ContactsOutlined,
  KeyOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { Button, Col, Drawer, Row } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../AccountManagement.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const draftUser = {
  photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
  fullName: 'Sen',
  userName: 'Sen',
  phone: '0344382294',
  dob: '07/06/2001',
  job: 'Funnier',
  team: 'No hope',
  gender: 'Male',
  email: 'sen76201@gmail.com',
  stars: 500,
  department: 'Tester',
  currentRole: {
    title: 'Admin đấy'
  }
};
interface IProps {
  refreshList: () => void;
  openPanel: (data?: A) => void;
}
function DetailPanel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    openDrawer
  }));

  const openDrawer = (data?: A) => {
    setOpen(true);
    console.log(data);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        title="User Details"
        placement="right"
        open={open}
        extra={<CloseOutlined onClick={closeDrawer} />}
        onClose={closeDrawer}
        maskClosable={false}
        closable={false}
        width={520}
        destroyOnClose={true}
        className={styles.detailPanel}
      >
        <div className={styles.title}>General Information</div>
        <Row className={styles.detailRow}>
          <Col className={styles.keyCol}>
            <UserOutlined /> {t('fullName')}
          </Col>
          <Col className={styles.valueCol}>Sen</Col>
        </Row>
        <Row className={styles.detailRow}>
          <Col className={styles.keyCol}>
            <MailOutlined /> {t('email')}
          </Col>
          <Col className={styles.valueCol}>
            <Link to={`mailto:${draftUser.email}`}>{draftUser.email}</Link>
          </Col>
        </Row>
        <Row className={styles.detailRow}>
          <Col className={styles.keyCol}>
            <PhoneOutlined /> {t('phone')}
          </Col>
          <Col className={styles.valueCol}>{draftUser.phone}</Col>
        </Row>
        <Row className={styles.detailRow}>
          <Col className={styles.keyCol}>
            <CalendarOutlined /> {t('date of birth')}
          </Col>
          <Col className={styles.valueCol}>{dayjs(draftUser.dob).format('DD MMM YYYY')}</Col>
        </Row>
        <Row className={styles.detailRow}>
          <Col className={styles.keyCol}>
            <CalendarOutlined /> {t('gender')}
          </Col>
          <Col className={styles.valueCol}>{draftUser.gender}</Col>
        </Row>
        <div className={styles.title}>System Information</div>
        <Row className={styles.detailRow}>
          <Col className={styles.keyCol}>
            <UserOutlined /> {t('username')}
          </Col>
          <Col className={styles.valueCol}>{draftUser.userName}</Col>
        </Row>
        <Row className={styles.detailRow}>
          <Col className={styles.keyCol}>
            <CoffeeOutlined /> {t('job')}
          </Col>
          <Col className={styles.valueCol}>{draftUser.job}</Col>
        </Row>
        <Row className={styles.detailRow}>
          <Col className={styles.keyCol}>
            <ContactsOutlined /> {t('department')}
          </Col>
          <Col className={styles.valueCol}>{draftUser.department}</Col>
        </Row>
        <Row className={styles.detailRow}>
          <Col className={styles.keyCol}>
            <UsergroupAddOutlined /> {t('team')}
          </Col>
          <Col className={styles.valueCol}>{draftUser.team}</Col>
        </Row>
        <Row className={styles.detailRow}>
          <Col className={styles.keyCol}>
            <KeyOutlined /> {t('role')}
          </Col>
          <Col className={styles.valueCol}>{draftUser.currentRole.title}</Col>
        </Row>
        <div className="actionBtnBottom">
          <Button onClick={closeDrawer}>{t('Common_Cancel')}</Button>
          <Button
            type="primary"
            onClick={() => {
              props.openPanel(draftUser);
              setOpen(false);
            }}
          >
            Update
          </Button>
        </div>
      </Drawer>
    </>
  );
}

export default forwardRef(DetailPanel);
