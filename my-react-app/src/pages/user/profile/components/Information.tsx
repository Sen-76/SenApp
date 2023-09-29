import { Col, Image, Row, Tooltip } from 'antd';
import styles from '../Profile.module.scss';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  CalendarOutlined,
  CoffeeOutlined,
  ContactsOutlined,
  EditOutlined,
  MailOutlined,
  ManOutlined,
  PhoneOutlined,
  WomanOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Paragraph from 'antd/es/typography/Paragraph';

interface IProps {
  draftUser: A;
  edit: () => void;
}
function Information(props: IProps) {
  const { draftUser, edit } = props;
  const { t } = useTranslation();
  return (
    <>
      <Row className={styles.header}>
        <span>{t('information')}</span>
        <EditOutlined className={styles.editIcon} onClick={edit} />
      </Row>
      <div className={styles.body}>
        <div style={{ marginBottom: 10 }}>
          <Image className={styles.avatar} width={100} src={draftUser.photoUrl} />
        </div>
        <span className={styles.userame}>{draftUser.fullName}</span>
        <div>
          <Row gutter={8} className={styles.row}>
            <Col className={styles.keyCol}>
              <MailOutlined /> {t('email')}
            </Col>
            <Col>
              <Tooltip placement="bottom" title={draftUser.email} color="#ffffff" arrow={true}>
                <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ maxWidth: 130, minWidth: 30 }}>
                  <Link to={`mailto:${draftUser.email}`}>{draftUser.email}</Link>
                </Paragraph>
              </Tooltip>
            </Col>
          </Row>
          <Row gutter={8} className={styles.row}>
            <Col className={styles.keyCol}>
              <PhoneOutlined /> {t('phone')}
            </Col>
            <Col className={styles.valCol}>
              <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ maxWidth: 130, minWidth: 30 }}>
                {draftUser.phone}
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={8} className={styles.row}>
            <Col className={styles.keyCol}>
              <CalendarOutlined /> {t('date of birth')}
            </Col>
            <Col className={styles.valCol}>
              <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ maxWidth: 130, minWidth: 30 }}>
                {dayjs(draftUser.dob).format('DD MMM YYYY')}
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={8} className={styles.row}>
            <Col className={styles.keyCol}>
              {draftUser.gender === 'Male' ? <ManOutlined /> : <WomanOutlined />} {t('gender')}
            </Col>
            <Col className={styles.valCol}>
              <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ maxWidth: 130, minWidth: 30 }}>
                {draftUser.gender}
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={8} className={styles.row}>
            <Col className={styles.keyCol}>
              <ContactsOutlined /> {t('department')}
            </Col>
            <Col className={styles.valCol}>
              <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ maxWidth: 130, minWidth: 30 }}>
                {draftUser.department}
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={8} className={styles.row}>
            <Col className={styles.keyCol}>
              <ContactsOutlined /> {t('team')}
            </Col>
            <Col className={styles.valCol}>
              <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ maxWidth: 130, minWidth: 30 }}>
                {draftUser.team}
              </Paragraph>
            </Col>
          </Row>
          <Row gutter={8} className={styles.row}>
            <Col className={styles.keyCol}>
              <CoffeeOutlined /> {t('job')}
            </Col>
            <Col className={styles.valCol}>
              <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ maxWidth: 130, minWidth: 30 }}>
                {draftUser.job}
              </Paragraph>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Information;
