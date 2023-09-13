import { Col, Row } from 'antd';
import styles from '../Profile.module.scss';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  CalendarOutlined,
  ContactsOutlined,
  EditOutlined,
  MailOutlined,
  ManOutlined,
  PhoneOutlined,
  WomanOutlined
} from '@ant-design/icons';
import EditAvatar from './EditAvatar';

interface IProps {
  draftUser: A;
  edit: () => void;
}
function Information(props: IProps) {
  const { draftUser, edit } = props;
  return (
    <>
      <Row className={styles.header}>
        <span>Information</span>
        <EditOutlined className={styles.editIcon} onClick={edit} />
      </Row>
      <div style={{ marginBottom: 10 }}>
        <EditAvatar imageLink={draftUser.photoUrl} name={draftUser.name} />
      </div>
      <span className={styles.userame}>{draftUser.fullName}</span>
      <Row gutter={8} className={styles.row}>
        <Col>
          <MailOutlined /> Email:{' '}
        </Col>
        <Col>
          <Link to={`mailto:${draftUser.email}`}>{draftUser.email}</Link>
        </Col>
      </Row>
      <Row gutter={8} className={styles.row}>
        <Col>
          <PhoneOutlined /> Phone:{' '}
        </Col>
        <Col>{draftUser.phone}</Col>
      </Row>
      <Row gutter={8} className={styles.row}>
        <Col>
          <CalendarOutlined /> Date of Birth:{' '}
        </Col>
        <Col>{dayjs(draftUser.dob).format('DD MMM YYYY')}</Col>
      </Row>
      <Row gutter={8} className={styles.row}>
        <Col>{draftUser.gender === 'Male' ? <ManOutlined /> : <WomanOutlined />} Gender: </Col>
        <Col>{draftUser.gender}</Col>
      </Row>
      <Row gutter={8} className={styles.row}>
        <Col>
          <ContactsOutlined /> Department:{' '}
        </Col>
        <Col>{draftUser.department}</Col>
      </Row>
    </>
  );
}

export default Information;
