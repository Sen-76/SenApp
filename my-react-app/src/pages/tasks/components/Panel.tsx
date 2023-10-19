import { CloseOutlined, EllipsisOutlined, EyeOutlined, ShareAltOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Drawer, Form, Input, Select, Upload, UploadFile, notification } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../Task.module.scss';
import { useTranslation } from 'react-i18next';
import { useLoading } from '@/common/context/useLoading';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';

const fileList: UploadFile[] = [
  {
    uid: '0',
    name: 'xxx.png',
    status: 'uploading',
    percent: 33
  },
  {
    uid: '-1',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  },
  {
    uid: '-2',
    name: 'zzz.png',
    status: 'error'
  }
];

interface IProps {
  refreshList: () => void;
}
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { showLoading, closeLoading } = useLoading();
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    openDrawer
  }));

  const openDrawer = (data?: A) => {
    setOpen(true);
    setIsEdit(false);
    if (data) {
      setIsEdit(true);
      form.setFieldsValue({ ...data });
    }
  };

  const closeDrawer = () => {
    setOpen(false);
    form.resetFields();
  };

  const onFinish = async (val: A) => {
    try {
      showLoading();
      props.refreshList();
      notification.open({
        message: t('Common_UpdateSuccess'),
        type: 'success'
      });
      closeDrawer();
      closeLoading();
    } catch (e) {
      console.log(e);
    } finally {
      closeLoading();
    }
  };

  const formRule = {
    title: [{ required: true, message: t('Common_Require_Field') }],
    fileSize: [{ required: true, message: t('Common_Require_Field') }],
    fileAccept: [{ required: true, message: t('Common_Require_Field') }],
    numberOfFile: [{ required: true, message: t('Common_Require_Field') }]
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().endOf('day');
  };

  return (
    <>
      <Drawer
        title={isEdit ? t('Configuration_File_Edit') : t('Configuration_File_Create')}
        placement="right"
        open={open}
        extra={
          <div style={{ display: 'flex', gap: 20 }}>
            <EyeOutlined />
            <ShareAltOutlined />
            <EllipsisOutlined />
            <CloseOutlined onClick={closeDrawer} />
          </div>
        }
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
          <Form.Item name="status" label={t('Common_Status')}>
            <Select />
          </Form.Item>
          <Form.Item name="prioty" label={t('Task_Prioty')}>
            <Select />
          </Form.Item>
          <Form.Item name="title" label={t('Task_DueDate')}>
            <DatePicker disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item name="title" label={t('Common_Description')}>
            <TextArea maxLength={1000} rows={5} showCount />
          </Form.Item>
          <Form.Item name="attachment" label={t('Task_Attachment')}>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
              defaultFileList={[...fileList]}
              multiple
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
