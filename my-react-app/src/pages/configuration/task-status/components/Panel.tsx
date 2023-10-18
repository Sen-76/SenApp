import { CloseOutlined } from '@ant-design/icons';
import { Button, ColorPicker, Drawer, Form, Input } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../TaskStatusConfiguration.module.scss';
import { useTranslation } from 'react-i18next';
import { util } from '@/common/helpers/util';

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

  const onFinish = async () => {
    const checkValid = await form.validateFields();
    if (checkValid) {
      console.log(form.getFieldsValue());
      console.log(
        typeof form.getFieldValue('color') === 'string'
          ? form.getFieldValue('color').toString()
          : util.rgbaToHex(form.getFieldValue('color').metaColor)
      );
    }
  };

  const formRule = {
    title: [{ required: true, message: t('Common_Require_Field') }],
    color: [{ required: true, message: t('Common_Require_Field') }]
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
        width={720}
        destroyOnClose={true}
      >
        <Form form={form} onFinish={onFinish} layout="vertical" className={styles.panelform}>
          <Form.Item name="title" label={t('Common_Title')} rules={formRule.title}>
            <Input maxLength={250} showCount />
          </Form.Item>
          <Form.Item name="color" label={t('Common_Color')} rules={formRule.color}>
            <ColorPicker />
          </Form.Item>
          <Form.Item name="description" label={t('Common_Description')}>
            <Input.TextArea maxLength={1000} showCount rows={5} />
          </Form.Item>
        </Form>
        <div className="actionBtnBottom">
          <Button onClick={closeDrawer}>{t('Common_Cancel')}</Button>
          <Button type="primary" htmlType="submit" onClick={onFinish}>
            {t('Common_Confirm')}
          </Button>
        </div>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
