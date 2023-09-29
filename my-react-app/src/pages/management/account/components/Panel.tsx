import { CloseOutlined } from '@ant-design/icons';
import { Button, DatePicker, Drawer, Form, Input, Select, Steps, notification } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../AccountManagement.module.scss';
import dayjs from 'dayjs';
import { GenderOptions, DepartmentOptions, RoleOptions } from '../AccountManagement.Model';
import { useTranslation } from 'react-i18next';
import { service } from '../../../../services/apis';
import { Rule } from 'antd/es/form';
import { useLoading } from '@/common/context/useLoading';

interface IProps {
  refreshList: () => void;
}
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { showLoading, closeLoading } = useLoading();
  const [customAlert, setCustomAlert] = useState<A>([]);
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

  const onConfirm = async () => {
    try {
      const generalCheck = await generalForm.validateFields();
      setEditData({ ...editData, ...generalForm.getFieldsValue() });
      generalCheck && setStep(1);
      const systemCheck = await systemForm.validateFields();
      if (step == 1 && generalCheck && systemCheck) {
        showLoading();
        if (isEdit) {
          await service.accountService.updateAccount({
            ...editData,
            ...systemForm.getFieldsValue(),
            userRole: null,
            userTeam: null,
            userDepartment: null,
            dob: dayjs(generalForm.getFieldValue('dob')).format('YYYY-MM-DD')
          });
          notification.open({
            message: t('Common_UpdateSuccess'),
            type: 'success'
          });
        } else {
          await service.accountService.addAccount({
            ...editData,
            ...systemForm.getFieldsValue(),
            userRole: null,
            userTeam: null,
            userDepartment: null,
            dob: dayjs(generalForm.getFieldValue('dob')).format('YYYY-MM-DD')
          });
          notification.open({
            message: t('Common_CreateSuccess'),
            type: 'success'
          });
        }
        closeDrawer();
        props.refreshList();
      }
    } catch (e: A) {
      if (e.response.data.status === 422) {
        const errors: A = e.response.data.errors;
        setCustomAlert(errors);
        systemForm.validateFields();
      }
    } finally {
      closeLoading();
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

  const checkDuplicateUsername = () => {
    if (customAlert.userName) {
      return Promise.reject('Trùng tên rồi');
    }
    return Promise.resolve();
  };

  const formRule = {
    fullName: [{ required: true, message: t('Common_Require_Field') }],
    userEmail: [
      { required: true, message: t('Common_Require_Field') },
      { type: 'email', message: t('Manage_Account_Invalid_Email_Format') }
    ] as Rule[],
    userPhone: [
      { required: true, message: t('Common_Require_Field') },
      {
        pattern: /^(?:\+84|0)(?:\d{9,10})$/,
        message: 'Invalid phone number format (e.g., 1234567890)'
      }
    ] as Rule[],
    dob: [{ required: true, message: t('Common_Require_Field') }],
    userName: [{ required: true, message: t('Common_Require_Field') }, { validator: checkDuplicateUsername }],
    password: [{ required: true, message: t('Common_Require_Field') }],
    userRole: [{ required: true, message: t('Common_Require_Field') }]
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
          items={[{ title: 'General Info' }, { title: 'System Info' }]}
        />
        {step === 0 && (
          <>
            <Form form={generalForm} layout="vertical" className={styles.panelform}>
              <Form.Item name="fullName" label={t('name')} rules={formRule.fullName}>
                <Input maxLength={250} showCount />
              </Form.Item>
              <Form.Item name="userEmail" label={t('email')} rules={formRule.userEmail}>
                <Input maxLength={250} showCount />
              </Form.Item>
              <Form.Item name="userPhone" label={t('phone')} rules={formRule.userPhone}>
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
            <Form form={systemForm} layout="vertical" className={styles.panelform}>
              <Form.Item name="userName" label={t('username')} rules={formRule.userName}>
                <Input maxLength={250} showCount />
              </Form.Item>
              <Form.Item name="jobTitle" label={t('job')}>
                <Input maxLength={250} showCount />
              </Form.Item>
              <Form.Item name="userDepartment" label={t('department')}>
                <Select options={DepartmentOptions} />
              </Form.Item>
              <Form.Item name="userTeam" label={t('team')}>
                <Select options={DepartmentOptions} />
              </Form.Item>
              <Form.Item name="userRole" label={t('role')} rules={formRule.userRole}>
                <Select options={RoleOptions} />
              </Form.Item>
            </Form>
          </>
        )}
        <div className="actionBtnBottom">
          <Button onClick={closeDrawer}>{t('Common_Cancel')}</Button>
          <Button type="primary" onClick={onConfirm}>
            {step === 1 ? t('Common_Confirm') : t('Common_Next')}
          </Button>
        </div>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
