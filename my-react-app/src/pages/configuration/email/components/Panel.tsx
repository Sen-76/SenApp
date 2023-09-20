import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../EmailConfiguation.module.scss';
import { useTranslation } from 'react-i18next';

interface IProps {
  refreshList: () => void;
}
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [form] = Form.useForm();

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
    setOpen(false);
    form.resetFields();
  };

  const onFinish = (val: A) => {
    console.log(val);
  };

  const formRule = {
    title: [{ required: true, message: t('Common_Require_Field') }]
  };

  return (
    <>
      <Drawer
        title={isEdit ? t('Configuration_Email_Edit') : t('Configuration_Email_Create')}
        placement="right"
        open={open}
        extra={<CloseOutlined onClick={closeDrawer} />}
        onClose={closeDrawer}
        maskClosable={false}
        closable={false}
        width={520}
        destroyOnClose={true}
      >
        <Form form={form} onFinish={onFinish} layout="vertical" className={styles.panelform}>
          <Form.Item name="title" label={t('Common_Title')} rules={formRule.title}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label={t('Common_Description')}>
            <Input.TextArea />
          </Form.Item>
          <div className="actionBtnBottom">
            <Button onClick={closeDrawer}>{t('Common_Cancel')}</Button>
            <Button type="primary" htmlType="submit">
              {t('Common_Confirm')}
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
