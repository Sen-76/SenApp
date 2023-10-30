import { CloseOutlined, EllipsisOutlined, EyeOutlined, ShareAltOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Drawer, Form, Input, Select, Upload, UploadFile, UploadProps, notification } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../Task.module.scss';
import { useTranslation } from 'react-i18next';
import { useLoading } from '@/common/context/useLoading';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import { service } from '@/services/apis';

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
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [taskStatusList, setTaskStatusList] = useState<TaskStatus.ITaskStatusModel[]>([]);

  useImperativeHandle(ref, () => ({
    openDrawer
  }));

  const openDrawer = async (data?: A) => {
    try {
      showLoading();
      setOpen(true);
      setIsEdit(false);
      await getTaskStatusList();
      form.setFieldValue('status', 'c24ddc20-68b5-4556-b34f-93b3b70a4e88');
      if (data) {
        setIsEdit(true);
        form.setFieldsValue({ ...data });
      }
    } catch (e) {
      console.log(e);
    } finally {
      closeLoading();
    }
  };

  const closeDrawer = () => {
    setOpen(false);
    form.resetFields();
  };

  const getTaskStatusList = async () => {
    try {
      const { data } = await service.taskStatusService.get({
        pageInfor: {
          pageSize: 100,
          pageNumber: 1,
          totalItems: 0
        }
      });
      setTaskStatusList(
        data.map((x: A) => ({
          label: x.title,
          value: x.id
        }))
      );
    } catch (e) {
      console.log(e);
    }
  };

  const onFinish = async (val: A) => {
    try {
      showLoading();
      props.refreshList();
      console.log(val);
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
    return current && current < dayjs().startOf('day');
  };

  const fileProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList
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
            <Select disabled={!isEdit} options={taskStatusList} />
          </Form.Item>
          <Form.Item name="prioty" label={t('Task_Prioty')}>
            <Select />
          </Form.Item>
          <Form.Item name="duedate" label={t('Task_DueDate')}>
            <DatePicker disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item name="description" label={t('Common_Description')}>
            <TextArea maxLength={1000} rows={5} showCount />
          </Form.Item>
          <Form.Item name="attachment" label={t('Task_Attachment')}>
            <Upload {...fileProps} listType="picture" multiple>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
