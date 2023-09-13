import { useBreadcrumb } from '../../../components/breadcrum/Breadcrum';
import { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import styles from './Profile.module.scss';
import { Col, Row } from 'antd';

//components
import Information from './components/Information';
import EditProfile from './components/EditInformation';
import Task from './components/Task';

const draftUser = {
  photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
  fullName: 'Sen',
  userName: 'Sen',
  phone: '0344382294',
  dob: '07/06/2001',
  gender: 'Male',
  email: 'sen76201@gmail.com',
  stars: 500,
  department: 'Tester',
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
  }
];
function Profile() {
  const { setBreadcrumb } = useBreadcrumb();
  const [isInfoEdit, setIsInfoEdit] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<A>();

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
    <Row className={styles.profile}>
      <Col className={styles.information}>
        {!isInfoEdit && <Information draftUser={draftUser} edit={edit} />}
        {isInfoEdit && <EditProfile draftUser={draftUser} cancelEdit={cancelEditz} />}
      </Col>
      <Col className={styles.task}>
        <Task task={draftTask} />
      </Col>
    </Row>
  );
}

export default Profile;
