import { useBreadcrumb } from '../../../components/breadcrum/Breadcrum';
import { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import styles from './Profile.module.scss';
import { Col, Row, Select } from 'antd';

//components
import Information from './components/Information';
import EditProfile from './components/EditInformation';
import Task from './components/Task';
import RecentlyActivities from './components/RecentlyActivities';
import PieChart from '@/components/chart/pie-chart/PieChart';
import { useTranslation } from 'react-i18next';

const draftUser = {
  photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
  fullName: 'Sen',
  userName: 'Sen',
  phone: '0344382294',
  dob: '07/06/2001',
  job: 'Funnier',
  gender: 'Male',
  email: 'sen76201@gmail.com',
  stars: 500,
  department: 'Tester',
  team: 'Team no hope',
  currentRole: {
    title: 'Admin đấy'
  }
};
const draftTask = [
  {
    title: 'Task 1',
    assignedTime: '2001/01/01',
    deadline: '2003/03/03',
    status: 'Closed'
  },
  {
    title: 'Task 1',
    assignedTime: '2001/01/01',
    deadline: '2003/03/03',
    status: 'Closed'
  },
  {
    title: 'Task 1',
    assignedTime: '2001/01/01',
    deadline: '2003/03/03',
    status: 'Closed'
  }
];
function Profile() {
  const { setBreadcrumb } = useBreadcrumb();
  const [isInfoEdit, setIsInfoEdit] = useState<boolean>(false);
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<A>();
  const pieChartData = [
    { name: 'Resolved', value: 5 },
    { name: 'Open', value: 20 },
    { name: 'Inprogress', value: 15 },
    { name: 'Finished', value: 1 }
  ];

  const getUserInfo = async () => {
    setUserInfo(draftUser);
  };

  const getTask = async () => {
    setUserInfo([]);
  };

  useEffect(() => {
    setBreadcrumb([{ icon: <UserOutlined />, text: 'Test' }, { text: 'Profile' }]);
    getUserInfo();
    getTask();
  }, []);

  const edit = () => {
    setIsInfoEdit(true);
  };
  const cancelEditz = () => {
    setIsInfoEdit(false);
  };

  return (
    <>
      <Row className={styles.profile}>
        <Col className={styles.information}>
          {!isInfoEdit && <Information draftUser={draftUser} edit={edit} />}
          {isInfoEdit && <EditProfile draftUser={draftUser} cancelEdit={cancelEditz} />}
        </Col>
        <Col className={styles.task}>
          <RecentlyActivities />
        </Col>
        <Col className={styles.task}>
          <Task task={draftTask} />
        </Col>
        <Col className={styles.information}>
          <Row className={styles.header}>
            <span>{t('statistical')}</span>
            <Select
              style={{ width: 100 }}
              defaultValue={'Month'}
              options={[
                {
                  value: 'Month',
                  label: 'Month'
                },
                {
                  value: 'Week',
                  label: 'Week'
                },
                {
                  value: 'Day',
                  label: 'Day'
                }
              ]}
            ></Select>
          </Row>
          <div className={styles.body}>
            <PieChart data={pieChartData} />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
