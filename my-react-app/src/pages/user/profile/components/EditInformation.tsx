import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import styles from '../Profile.module.scss';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import EditAvatar from './EditAvatar';
import { useTranslation } from 'react-i18next';

const genderOptions = [
  {
    label: 'Male',
    value: 'Male'
  },
  {
    label: 'Female',
    value: 'Female'
  }
];
const departmentOptions = [
  {
    label: 'Tester',
    value: 'Tester'
  },
  {
    label: 'Development',
    value: 'Development'
  }
];
interface IProps {
  draftUser: A;
  cancelEdit: () => void;
}
function EditInformation(props: IProps) {
  const { draftUser, cancelEdit } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    draftUser.dob = dayjs(draftUser.dob);
    form.setFieldsValue(draftUser);
  }, []);

  const onFinish = (val: A) => {
    console.log(val);
  };

  return (
    <div className={styles.editInformation}>
      <Row className={styles.header}>
        <span>Information</span>
      </Row>
      <div style={{ marginBottom: 10 }}>
        <EditAvatar imageLink={draftUser.photoUrl} name={draftUser.name} />
      </div>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Full name" name="fullName">
          <Input></Input>
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input></Input>
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input></Input>
        </Form.Item>
        <Form.Item label="Date of Birth" name="dob">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Select options={genderOptions} placeholder="Select a gender" />
        </Form.Item>
        <Form.Item label="Department" name="department">
          <Select options={departmentOptions} placeholder="Select a gender" />
        </Form.Item>
        <div>
          <Button onClick={cancelEdit}>{t('Common_Cancel')}</Button>
          <Button type="primary" htmlType="submit">
            {t('Common_Save')}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditInformation;
