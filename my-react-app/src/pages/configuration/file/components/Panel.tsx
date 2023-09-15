import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, InputNumber, Select } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../FileConfiguration.module.scss';
import { useTranslation } from 'react-i18next';

interface IProps {
  refreshList: () => void;
}
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const [editData, setEditData] = useState<A>();
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
      setEditData(data);
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

  return (
    <>
      <Drawer
        title="Panel"
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
          <Form.Item name="title" label={t('title')}>
            <Input />
          </Form.Item>
          <Form.Item name="fileSize" label={`${t('file size')} ( Mb )`}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="fileSize" label={t('file size')}>
            <Select />
          </Form.Item>
          <Form.Item name="fileAccept" label={t('file size')}>
            <Select mode="multiple" />
          </Form.Item>
          <Form.Item name="numberOfFile" label={t('file size')}>
            <Select />
          </Form.Item>
          <div className="actionBtnBottom">
            <Button onClick={closeDrawer}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
