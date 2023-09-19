import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, Select } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../FileConfiguration.module.scss';
import { useTranslation } from 'react-i18next';
import { fileFolder, fileTypeOption } from '../File.Model';

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

  const fileSizeCustomRule = (rule: A, value: string) => {
    if (value && (!Number.isInteger(Number(value)) || 1 > Number(value) || Number(value) > 99 || value.includes('.'))) {
      return Promise.reject('Please enter only Positive Integers in this field.');
    }
    return Promise.resolve();
  };

  const formRule = {
    title: [{ required: true, message: t('this field is required.') }],
    fileSize: [{ required: true, message: t('this field is required.') }, { validator: fileSizeCustomRule }],
    fileAccept: [{ required: true, message: t('this field is required.') }],
    numberOfFile: [{ required: true, message: t('this field is required.') }]
  };

  return (
    <>
      <Drawer
        title={isEdit ? t('edit file configuration') : t('create file configuration')}
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
          <Form.Item name="title" label={t('title')} rules={formRule.title}>
            <Input />
          </Form.Item>
          <Form.Item name="fileSize" label={`${t('file size')} (MB)`} rules={formRule.fileSize}>
            <Input />
          </Form.Item>
          <Form.Item name="fileAccept" label={t('file accept')} rules={formRule.fileAccept}>
            <Select mode="multiple" options={fileTypeOption} />
          </Form.Item>
          <Form.Item name="numberOfFile" label={t('file type')} rules={formRule.numberOfFile}>
            <Select options={fileFolder} />
          </Form.Item>
          <div className="actionBtnBottom">
            <Button onClick={closeDrawer}>{t('cancel')}</Button>
            <Button type="primary" htmlType="submit">
              {t('confirm')}
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
