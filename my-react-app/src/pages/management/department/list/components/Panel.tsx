import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../Department.module.scss';
import { useTranslation } from 'react-i18next';
import { service } from '@/services/apis';

interface IProps {
  refreshList: () => void;
}
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [customAlert, setCustomAlert] = useState<A>();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { TextArea } = Input;

  useImperativeHandle(ref, () => ({
    openDrawer
  }));

  const openDrawer = (data?: A) => {
    setOpen(true);
    setIsEdit(false);
    if (data) {
      setIsEdit(true);
      form.setFieldsValue(data);
    }
  };

  const closeDrawer = () => {
    form.resetFields();
    setOpen(false);
  };

  const onFinish = async (val: A) => {
    try {
      const result = await service.departmentService.create(val);
      closeDrawer();
      props.refreshList();
      console.log(result);
    } catch (e: A) {
      if (e.response?.data.status === 422) {
        const errors: A = e.response.data.errors;
        setCustomAlert(errors);
      }
    }
    console.log(val);
  };

  const formRule = {
    title: [{ required: true, message: t('Common_Require_Field') }]
  };

  return (
    <>
      <Drawer
        title={isEdit ? 'Edit Department' : 'Add Department'}
        placement="right"
        open={open}
        extra={<CloseOutlined onClick={closeDrawer} />}
        onClose={closeDrawer}
        maskClosable={false}
        closable={false}
        width={720}
        destroyOnClose={true}
      >
        <Form form={form} onFinish={onFinish} layout="vertical" className={styles.panelform}>
          <Form.Item
            name="title"
            label="Title"
            rules={formRule.title}
            className={customAlert?.title && 'customFieldAlert'}
          >
            <Input maxLength={250} showCount onChange={() => setCustomAlert({ ...customAlert, title: '' })} />
          </Form.Item>
          <div className="customAlert">{customAlert?.title && t('Manage_Account_Exist_Email')}</div>
          <Form.Item name="description" label={t('Common_Description')}>
            <TextArea maxLength={1000} showCount />
          </Form.Item>
          <div className="actionBtnBottom">
            <Button onClick={closeDrawer}>{t('Common_Cancel')}</Button>
            <Button type="primary" htmlType="submit">
              {t('Common_Save')}
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
