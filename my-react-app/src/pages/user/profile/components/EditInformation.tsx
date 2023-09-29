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
      <div className={styles.body}>
        <div style={{ marginBottom: 10 }}>
          <EditAvatar imageLink={draftUser.photoUrl} name={draftUser.name} />
        </div>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item label={t('fullName')} name="fullName">
            <Input></Input>
          </Form.Item>
          <Form.Item label={t('phone')} name="phone">
            <Input></Input>
          </Form.Item>
          <Form.Item label={t('date of birth')} name="dob">
            <DatePicker />
          </Form.Item>
          <Form.Item label={t('gender')} name="gender">
            <Select options={genderOptions} placeholder="Select a gender" />
          </Form.Item>
          <Form.Item label={t('job')} name="job">
            <Input></Input>
          </Form.Item>
          <div className="actionBtnBottom">
            <Button onClick={cancelEdit}>{t('Common_Cancel')}</Button>
            <Button type="primary" htmlType="submit">
              {t('Common_Save')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EditInformation;
