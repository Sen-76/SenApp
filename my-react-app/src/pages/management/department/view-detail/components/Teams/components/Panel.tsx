import { CloseOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Form, Input, Select, notification } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoading } from '@/common/context/useLoading';
import { util } from '@/common/helpers/util';

interface IProps {
  refreshList: () => void;
}
const draftUserList = [
  {
    id: 1,
    fullName: 'Sen 1',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  },
  {
    id: 2,
    fullName: 'Sen 2',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  },
  {
    id: 3,
    fullName: 'Sen 3',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  },
  {
    id: 4,
    fullName: 'Sen 4',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  },
  {
    id: 5,
    fullName: 'Sen 5',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  },
  {
    id: '6',
    fullName: 'Sen 6',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  },
  {
    id: '7',
    fullName: 'Sen 7',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  },
  {
    id: '8',
    fullName: 'Sen 8',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  },
  {
    id: '9',
    fullName: 'Sen 9',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  },
  {
    id: '10',
    fullName: 'Sen 10',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  }
];
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userOptions, setUserOptions] = useState<A>([]);
  const { showLoading, closeLoading } = useLoading();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    openDrawer
  }));

  const openDrawer = (data?: A) => {
    setOpen(true);
    setIsEdit(false);
    draftUserList.forEach((element) => {
      setUserOptions((prevOptions: A) => [
        ...prevOptions,
        {
          key: element.id,
          label: (
            <div style={{ marginRight: 10, display: 'flex', alignItems: 'center' }}>
              <Avatar size={40} src={element.photoUrl} style={{ marginRight: 10, backgroundColor: util.randomColor() }}>
                {element.fullName?.charAt(0)}
              </Avatar>
              {element.fullName}
            </div>
          ),
          value: element.id
        }
      ]);
    });
    if (data) {
      data.members = data.members.map((m: A) => ({
        key: m.id,
        label: (
          <div style={{ marginRight: 10, display: 'flex', alignItems: 'center' }}>
            <Avatar size={40} src={m.photoUrl} style={{ marginRight: 10, backgroundColor: util.randomColor() }}>
              {m.fullName?.charAt(0)}
            </Avatar>
            {m.fullName}
          </div>
        ),
        value: m.id
      }));
      form.setFieldsValue(data);
      setIsEdit(true);
    }
  };

  const closeDrawer = () => {
    setOpen(false);
    form.resetFields();
    setUserOptions([]);
  };

  const formRule = {
    title: [{ required: true, message: t('Common_Require_Field') }]
  };

  const onFinish = (val: A) => {
    showLoading();
    if (isEdit) {
      const timeout = setTimeout(() => {
        closeLoading();
        clearTimeout(timeout);
        notification.open({
          message: t('Common_UpdateSuccess'),
          type: 'success'
        });
        closeDrawer();
        props.refreshList();
      }, 2000);
    } else {
      const timeout = setTimeout(() => {
        closeLoading();
        clearTimeout(timeout);
        notification.open({
          message: t('Common_CreateSuccess'),
          type: 'success'
        });
        closeDrawer();
        props.refreshList();
      }, 2000);
    }
  };

  return (
    <>
      <Drawer
        title={isEdit ? t('Department_Team_Edit') : t('Department_Team_Create')}
        placement="right"
        open={open}
        extra={<CloseOutlined onClick={closeDrawer} />}
        onClose={closeDrawer}
        maskClosable={false}
        closable={false}
        width={520}
        destroyOnClose={true}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="name" label={t('Common_Title')} rules={formRule.title}>
            <Input maxLength={250} showCount size="large" />
          </Form.Item>
          <Form.Item name="description" label={t('Common_Description')}>
            <Input.TextArea maxLength={1000} showCount />
          </Form.Item>
          <Form.Item name="members" label={t('members')}>
            <Select mode="multiple" allowClear style={{ width: '100%' }} options={userOptions} />
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
