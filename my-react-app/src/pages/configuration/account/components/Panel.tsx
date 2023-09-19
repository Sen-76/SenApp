import { CloseOutlined } from '@ant-design/icons';
import { Button, DatePicker, Drawer, Form, Input, Select, Steps } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../AccountConfiguration.module.scss';
import dayjs from 'dayjs';
import { GenderOptions, DepartmentOptions, RoleOptions } from '../AccountConfiguration.Model';
import { useTranslation } from 'react-i18next';

interface IProps {
  refreshList: () => void;
}
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [editData, setEditData] = useState<A>();
  const { t } = useTranslation();
  const [generalForm] = Form.useForm();
  const [systemForm] = Form.useForm();

  useImperativeHandle(ref, () => ({
    openDrawer
  }));

  const openDrawer = (data?: A) => {
    setOpen(true);
    setIsEdit(false);
    if (data) {
      data.dob = dayjs(data.dob);
      setIsEdit(true);
      setEditData(data);
      generalForm.setFieldsValue(data);
      systemForm.setFieldsValue(data);
    }
  };

  const closeDrawer = () => {
    setOpen(false);
    setStep(0);
    setEditData({});
    generalForm.resetFields();
    systemForm.resetFields();
  };

  const onFinish = (val: A) => {
    console.log(val);
  };

  const onConfirm = async () => {
    try {
      const generalCheck = await generalForm.validateFields();
      setEditData(generalForm.getFieldsValue());
      generalCheck && setStep(1);
      const systemCheck = await systemForm.validateFields();
      if (generalCheck && systemCheck) {
        console.log({ ...editData, ...systemForm.getFieldsValue() });
      }
    } catch {
      console.log('');
    }
  };

  const onStepChange = async (value: number) => {
    try {
      const generalCheck = await generalForm.validateFields();
      generalCheck && setStep(value);
    } catch {
      console.log('');
    }
  };

  const formRule = {
    fullName: [{ required: true, message: t('this field is required.') }],
    email: [{ required: true, message: t('this field is required.') }],
    phone: [{ required: true, message: t('this field is required.') }],
    dob: [{ required: true, message: t('this field is required.') }],
    username: [{ required: true, message: t('this field is required.') }],
    password: [{ required: true, message: t('this field is required.') }],
    role: [{ required: true, message: t('this field is required.') }]
  };

  return (
    <>
      <Drawer
        title={isEdit ? `${t('edit account')}` : `${t('add account')}`}
        placement="right"
        open={open}
        extra={<CloseOutlined onClick={closeDrawer} />}
        onClose={closeDrawer}
        maskClosable={false}
        closable={false}
        width={720}
        destroyOnClose={true}
      >
        <Steps
          style={{ width: '70%', margin: 'auto', marginBottom: 20 }}
          onChange={onStepChange}
          current={step}
          items={[
            {
              title: 'General Info',
              description: 'general information'
            },
            {
              title: 'System Info',
              description: 'system information'
            }
          ]}
        />
        {step === 0 && (
          <>
            <Form form={generalForm} onFinish={onFinish} layout="vertical" className={styles.panelform}>
              <Form.Item name="fullName" label={t('name')} rules={formRule.fullName}>
                <Input />
              </Form.Item>
              <Form.Item name="email" label={t('email')} rules={formRule.email}>
                <Input />
              </Form.Item>
              <Form.Item name="phone" label={t('phone')} rules={formRule.phone}>
                <Input />
              </Form.Item>
              <Form.Item name="dob" label={t('date of birth')} rules={formRule.dob}>
                <DatePicker format={'DD MMM YYYY'} />
              </Form.Item>
              <Form.Item name="gender" label={t('gender')}>
                <Select options={GenderOptions} />
              </Form.Item>
            </Form>
          </>
        )}
        {step === 1 && (
          <>
            <Form form={systemForm} onFinish={onFinish} layout="vertical" className={styles.panelform}>
              <Form.Item name="username" label={t('username')} rules={formRule.username}>
                <Input />
              </Form.Item>
              <Form.Item name="department" label={t('department')}>
                <Select options={DepartmentOptions} />
              </Form.Item>
              <Form.Item name="team" label={t('team')}>
                <Select options={DepartmentOptions} />
              </Form.Item>
              <Form.Item name="role" label={t('role')} rules={formRule.role}>
                <Select options={RoleOptions} />
              </Form.Item>
            </Form>
          </>
        )}
        <div className="actionBtnBottom">
          <Button onClick={closeDrawer}>{t('cancel')}</Button>
          <Button type="primary" onClick={onConfirm}>
            {step === 1 ? t('confirm') : t('next')}
          </Button>
        </div>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
