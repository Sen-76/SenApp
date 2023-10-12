import { CloseOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Empty, Form, Input, Select, Spin, Steps, Table, Tooltip, notification } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import styles from '../Department.module.scss';
import { useTranslation } from 'react-i18next';
import { service } from '@/services/apis';
import useDebounce from '@/common/helpers/useDebounce';
import { EState } from '@/pages/management/account/AccountManagement.Model';
import Paragraph from 'antd/es/typography/Paragraph';
import { util } from '@/common/helpers/util';
import { ColumnsType } from 'antd/es/table';
import { useLoading } from '@/common/context/useLoading';

interface IProps {
  refreshList: () => void;
}
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [customAlert, setCustomAlert] = useState<A>({});
  const [searchUserValue, setSearchUserValue] = useState<string>('');
  const [searchManageValue, setSearchManagerValue] = useState<string>('');
  const [selectLoading, setSelectLoading] = useState<boolean>();
  const [tableLoading, setTableLoading] = useState<boolean>();
  const userDebounced = useDebounce(searchUserValue, 300);
  const userDebouncedManager = useDebounce(searchManageValue, 300);
  const [editData, setEditData] = useState<Department.IDepartmentCreateModel>();
  const [step, setStep] = useState<number>(0);
  const { showLoading, closeLoading } = useLoading();
  const [userList, setUserList] = useState<Account.IAccountModel[]>([]);
  const [userMemberList, setUserMemberList] = useState<Account.IAccountModel[]>([]);
  const [memberList, setMemberList] = useState<Department.IDepartmentModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<string[]>([]);
  const [selectedManager, setSelectedManager] = useState<string>();
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
    setMemberList([]);
    setSelectedUser([]);
    setStep(0);
    setOpen(false);
  };

  const onConfirm = async () => {
    const generalCheck = await form.validateFields();
    setEditData({ ...form, ...form.getFieldsValue() });
    generalCheck && setStep(1);
    if (step == 1 && generalCheck) {
      try {
        if (isEdit) {
          console.log('edit');
        } else {
          showLoading();
          await service.departmentService.create({
            ...editData,
            members: memberList.map((x) => x.id)
          });
          closeLoading();
          closeDrawer();
          props.refreshList();
          notification.open({
            message: t('Common_CreateSuccess'),
            type: 'success'
          });
        }
      } catch (e: A) {
        if (e.response?.data.status === 422) {
          const errors: A = e.response.data.errors;
          setCustomAlert(errors);
          setStep(0);
        }
      } finally {
        closeLoading();
      }
    }
  };

  const formRule = {
    title: [{ required: true, message: t('Common_Require_Field') }]
  };

  useEffect(() => {
    getUsers(false);
  }, [userDebounced]);

  useEffect(() => {
    getUsers(true);
  }, [userDebouncedManager]);

  const initDataGrid: Common.IDataGrid = {
    pageInfor: {
      pageSize: 10,
      pageNumber: 1,
      totalItems: 0
    },
    searchInfor: {
      searchValue: '',
      searchColumn: ['FullName', 'UserEmail']
    },
    filter: [{ key: 'Status', value: [EState.Activate] }, { key: 'ownerDepartmentId' }, { key: 'userDepartment' }]
  };

  const getUsers = async (isSearchManager?: boolean) => {
    try {
      const draftParam = { ...initDataGrid };
      draftParam.searchInfor!.searchValue = isSearchManager ? userDebouncedManager : userDebounced ?? '';
      selectedUser.length > 0 && draftParam.filter!.push({ key: 'id', value: selectedUser, operators: 'not in' });
      const result = await service.accountService.getAccount(draftParam);
      const optionsValue = result.data?.map((x: A) => ({
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar size={30} style={{ marginRight: '16px', backgroundColor: util.randomColor() }}>
              {x.fullName?.charAt(0)}
            </Avatar>
            <div>
              <div>{x.fullName}</div>
              <div>{x.jobDetail}</div>
            </div>
          </div>
        ),
        value: x.id
      }));
      setUserList(optionsValue);
      isSearchManager && setUserMemberList(optionsValue);
      setSelectLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onMemberSelect = async (val: A) => {
    try {
      setTableLoading(true);
      // const draftParam = { ...initDataGrid };
      // if (draftParam.searchInfor) {
      //   const id = draftParam.filter?.findIndex((x) => x.key === 'Id');
      //   id !== -1 && draftParam.filter?.splice(id as number, 1);
      //   draftParam.filter?.push({
      //     key: 'Id',
      //     value: [val]
      //   });
      // }
      // const result = await service.accountService.getAccount(draftParam);
      setSearchUserValue('');
      form.setFieldValue('members', '');
      const result = await service.accountService.getDetal(val);
      setMemberList([...memberList, result.data]);
      setSelectedUser([...selectedUser, result.data.id]);
      setTableLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onManagerSelect = async (val: A) => {
    setSelectedUser([...selectedUser.filter((x) => x !== selectedManager), val]);
    setSelectedManager(val);
    setSearchManagerValue('');
  };

  const onMemberRemove = (id: string) => {
    setMemberList(memberList.filter((x: A) => x.id !== id));
  };

  const onStepChange = async (value: number) => {
    try {
      const generalCheck = await form.validateFields();
      setEditData({ ...editData, ...form.getFieldsValue() });
      generalCheck && setStep(value);
    } catch (e) {
      console.log(e);
    }
  };

  const backStep = () => {
    setStep(step - 1);
  };

  const columns: ColumnsType<A> = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return (
          <Tooltip placement="bottom" title={record.name} color="#ffffff" arrow={true}>
            <div style={{ display: 'flex', alignItems: 'center', minWidth: 150 }}>
              <Avatar size={40} src={record.photoUrl} style={{ marginRight: 10, backgroundColor: util.randomColor() }}>
                {record.fullName?.charAt(0)}
              </Avatar>
              <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ maxWidth: 150, minWidth: 30 }}>
                {record.fullName}
              </Paragraph>
            </div>
          </Tooltip>
        );
      }
    },
    {
      title: t('job'),
      dataIndex: 'job',
      key: 'job',
      render: (_, record) => {
        return record.job;
      }
    },
    {
      title: t('Common_Action'),
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      className: 'actionCollumn',
      render: (_, record) => {
        return (
          <Tooltip placement="bottom" title={t('Common_Delete')} color="#ffffff" arrow={true}>
            <Button type="text" onClick={() => onMemberRemove(record.id)} icon={<DeleteOutlined />} />
          </Tooltip>
        );
      }
    }
  ];

  return (
    <>
      <Drawer
        title={isEdit ? t('Department_Edit_Department') : t('Department_Add_Department')}
        placement="right"
        open={open}
        extra={<CloseOutlined onClick={closeDrawer} />}
        onClose={closeDrawer}
        maskClosable={false}
        closable={false}
        width={720}
        destroyOnClose={true}
      >
        <Steps
          style={{ width: '70%', margin: 'auto', marginBottom: 20 }}
          onChange={onStepChange}
          current={step}
          items={[{ title: t('Manage_Deparment_Info') }, { title: t('Common_AssignMember') }]}
        />
        <Form form={form} layout="vertical" className={styles.panelform}>
          {step === 0 && (
            <>
              <Form.Item
                name="title"
                label="Title"
                rules={formRule.title}
                className={customAlert?.title && 'customFieldAlert'}
              >
                <Input maxLength={250} showCount onChange={() => setCustomAlert({ ...customAlert, title: '' })} />
              </Form.Item>
              {customAlert?.title && <div className="customAlert">{t('Manage_Account_Exist_Email')}</div>}
              <Form.Item
                name="owner"
                label="Manager"
                rules={formRule.title}
                className={customAlert?.title && 'customFieldAlert'}
              >
                <Select
                  showSearch
                  // labelInValue
                  placeholder={t('Common_SearchNameAndEmail')}
                  onSelect={onManagerSelect}
                  onClick={() => {
                    getUsers(true);
                    setSelectLoading(true);
                  }}
                  onSearch={(value) => {
                    setSelectLoading(true);
                    setUserList([]);
                    setSearchManagerValue(value);
                  }}
                  notFoundContent={
                    selectLoading ? (
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 100
                        }}
                      >
                        <Spin />
                      </div>
                    ) : (
                      <Empty />
                    )
                  }
                  dropdownRender={(menu) => <>{menu}</>}
                  filterOption={() => true}
                  options={userMemberList}
                  suffixIcon={<SearchOutlined />}
                />
              </Form.Item>
              <Form.Item name="description" label={t('Common_Description')}>
                <TextArea maxLength={1000} showCount rows={5} />
              </Form.Item>
            </>
          )}
          {step === 1 && (
            <>
              <Form.Item name="members" label={t('members')}>
                <Select
                  style={{ width: '100%', marginBottom: 10 }}
                  // labelInValue
                  size="large"
                  onClick={() => {
                    getUsers(false);
                    setSelectLoading(true);
                  }}
                  showSearch
                  onSearch={(value) => {
                    setSelectLoading(true);
                    setUserList([]);
                    setSearchUserValue(value);
                  }}
                  notFoundContent={
                    selectLoading ? (
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 100
                        }}
                      >
                        <Spin />
                      </div>
                    ) : (
                      <Empty />
                    )
                  }
                  dropdownRender={(menu) => <>{menu}</>}
                  filterOption={() => true}
                  options={userList}
                  suffixIcon={<SearchOutlined />}
                  onSelect={onMemberSelect}
                  placeholder="Assign members to department"
                />
              </Form.Item>
              <div>
                <Table
                  columns={columns}
                  dataSource={memberList}
                  loading={tableLoading}
                  rowKey={(record) => record.id}
                  style={{ marginTop: '-30px' }}
                  pagination={{
                    pageSize: 5,
                    total: memberList.length
                  }}
                />
              </div>
            </>
          )}
        </Form>
        <div className="actionBtnBottom">
          <Button onClick={closeDrawer}>{t('Common_Cancel')}</Button>
          {step !== 0 && <Button onClick={backStep}>{t('Common_Back')}</Button>}
          <Button type="primary" onClick={onConfirm} loading={tableLoading}>
            {step === 1 ? t('Common_Confirm') : t('Common_Next')}
          </Button>
        </div>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
