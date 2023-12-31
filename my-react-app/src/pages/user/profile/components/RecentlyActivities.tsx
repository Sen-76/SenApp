import { Row, Timeline } from 'antd';
import styles from '../Profile.module.scss';
import { SmileOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function RecentlyActivities() {
  const { t } = useTranslation();
  return (
    <>
      <Row className={styles.header}>
        <span>{t('recently activities')}</span>
        <Link to="./">{t('Common_ViewAll')}</Link>
      </Row>
      <div className={styles.body}>
        <Timeline
          style={{ width: '100%' }}
          items={[
            {
              color: 'green',
              children: 'Create a services site 2015-09-01'
            },
            {
              color: 'green',
              children: 'Create a services site 2015-09-01'
            },
            {
              color: 'red',
              children: (
                <>
                  <p>Solve initial network problems 1</p>
                  <p>Solve initial network problems 2</p>
                  <p>Solve initial network problems 3 2015-09-01</p>
                </>
              )
            },
            {
              children: (
                <>
                  <p>Technical testing 1</p>
                  <p>Technical testing 2</p>
                  <p>Technical testing 3 2015-09-01</p>
                </>
              )
            },
            {
              color: 'gray',
              children: (
                <>
                  <p>Technical testing 1</p>
                  <p>Technical testing 2</p>
                  <p>Technical testing 3 2015-09-01</p>
                </>
              )
            },
            {
              color: 'gray',
              children: (
                <>
                  <p>Technical testing 1</p>
                  <p>Technical testing 2</p>
                  <p>Technical testing 3 2015-09-01</p>
                </>
              )
            },
            {
              color: '#00CCFF',
              dot: <SmileOutlined />,
              children: <p>Custom color testing</p>
            }
          ]}
        />
      </div>
    </>
  );
}

export default RecentlyActivities;
