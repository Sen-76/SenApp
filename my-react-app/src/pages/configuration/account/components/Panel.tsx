import { CloseOutlined } from '@ant-design/icons';
import { Button, DatePicker, Drawer, Form, Input, Select } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../AccountConfiguration.module.scss';
import dayjs from 'dayjs';
import { GenderOptions, DepartmentOptions, RoleOptions } from '../AccountConfiguration.Model';

interface IProps {
  refreshList: () => void;
}
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<A>();
  const [form] = Form.useForm();
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
      form.setFieldsValue(data);
    }
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  const onFinish = (val: A) => {
    console.log(val);
  };
  return (
    <>
      <Drawer
        title={isEdit ? 'Edit Account' : 'Add Account'}
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
          <Form.Item name="fullName" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="dob" label="Date of Birth">
            <DatePicker format={'DD MMM YYYY'} />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Select options={GenderOptions} />
          </Form.Item>
          <Form.Item name="department" label="Department">
            <Select options={DepartmentOptions} />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Select options={RoleOptions} />
          </Form.Item>
          <div className={styles.actionBtnBottom}>
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
