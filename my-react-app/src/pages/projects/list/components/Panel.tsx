import { CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Drawer, Form, Input, Row, Select, message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../Project.module.scss';
import TextArea from 'antd/es/input/TextArea';
import { service } from '@/services/apis';
import { useLoading } from '@/common/context/useLoading';
import Paragraph from 'antd/es/typography/Paragraph';
import dayjs from 'dayjs';

interface IProps {
  refreshList: () => void;
}
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [editData, setEditData] = useState<Role.IRoleCreateModel>();
  const { showLoading, closeLoading } = useLoading();
  const [customAlert, setCustomAlert] = useState<A>();
  const [openDefault, setOpenDefault] = useState<A[]>([]);
  const [departmentList, setDepartmentList] = useState<A>();
  const [teamList, setTeamList] = useState<A>([]);

  useImperativeHandle(ref, () => ({
    openDrawer
  }));

  const openDrawer = async (data?: Role.IRoleModel) => {
    try {
      showLoading();
      setOpen(true);
      setIsEdit(false);
      form.setFieldsValue(data);
      await getDepartmentList();
      //   if (data) {
      //     setIsEdit(true);
      //     await getProjectDetail(data?.id ?? '');
      //   }
    } catch (e) {
      console.log(e);
    } finally {
      closeLoading();
    }
  };

  const getDepartmentList = async () => {
    try {
      const result = await service.departmentService.get({
        pageInfor: {
          pageSize: 100,
          pageNumber: 1,
          totalItems: 0
        }
      });
      setDepartmentList([
        { label: 'Common_None', value: null },
        ...result.data.map((department: A) => ({
          label: department.title,
          value: department.id
        }))
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  const getTeam = async (departmentId: string) => {
    try {
      showLoading();
      const result = await service.teamService.get({
        pageInfor: {
          pageSize: 100,
          pageNumber: 1,
          totalItems: 0
        },
        filter: [{ key: 'DepartmentId', value: [departmentId] }]
      });
      setTeamList([
        { label: 'Common_None', value: null },
        ...result.data.map((team: A) => ({
          label: team.title,
          value: team.id
        }))
      ]);
      closeLoading();
    } catch (e) {
      console.log(e);
    }
  };

  const getProjectDetail = async (id: string) => {
    try {
      const result = await service.rolesService.detail(id);
      form.setFieldsValue(result.data);
      Object.entries(result.data.permission).map(([label, value]) => {
        openDefault.push(label);
        setOpenDefault([...openDefault]);
      });
      setEditData(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  const closeDrawer = () => {
    form.resetFields();
    setCustomAlert([]);
    setOpen(false);
  };

  const formRule = {
    title: [{ required: true, message: t('Common_Require_Field') }]
  };

  const disabledStartDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().endOf('day').startOf('day');
  };

  const disabledDueDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs(form.getFieldValue('startDate')).endOf('day').startOf('day');
  };

  return (
    <>
      <Drawer
        title={isEdit ? `${t('Manage_Project_Edit')}` : `${t('Manage_Project_Add')}`}
        placement="right"
        open={open}
        extra={<CloseOutlined onClick={closeDrawer} />}
        onClose={closeDrawer}
        maskClosable={false}
        closable={false}
        width={720}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical" className={styles.panelform}>
          <Form.Item
            name="title"
            label={t('Common_Title')}
            rules={formRule.title}
            className={customAlert?.userEmail && 'customFieldAlert'}
          >
            <Input maxLength={250} showCount onChange={() => setCustomAlert({ ...customAlert, title: '' })} />
          </Form.Item>
          {customAlert?.title && <div className="customAlert">{t('Common_TitleExist')}</div>}
          <Form.Item name="userDepartmentId" label={t('department')}>
            <Select
              options={departmentList}
              onSelect={(val) => {
                form.setFieldValue('userTeam', '');
                getTeam(val);
              }}
            />
          </Form.Item>
          <Form.Item name="userTeam" label={t('team')}>
            <Select options={teamList} />
          </Form.Item>
          <Form.Item name="startDate" label={t('Project_StartDate')}>
            <DatePicker disabledDate={disabledStartDate} />
          </Form.Item>
          <Form.Item name="dueDate" label={t('Project_DueDate')}>
            <DatePicker disabledDate={disabledDueDate} />
          </Form.Item>
          <Form.Item name="description" label={t('Common_Description')}>
            <TextArea maxLength={1000} rows={5} showCount />
          </Form.Item>
          <div className="actionBtnBottom">
            <Button onClick={closeDrawer}>{t('Common_Cancel')}</Button>
            <Button type="primary">{t('Common_Confirm')}</Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
