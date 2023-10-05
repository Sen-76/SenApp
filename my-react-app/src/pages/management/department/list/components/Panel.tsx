import { CloseOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Empty, Form, Input, Select, Spin, Table, Tooltip } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import styles from '../Department.module.scss';
import { useTranslation } from 'react-i18next';
import { service } from '@/services/apis';
import useDebounce from '@/common/helpers/useDebounce';
import { EState } from '@/pages/management/account/AccountManagement.Model';
import Paragraph from 'antd/es/typography/Paragraph';
import { util } from '@/common/helpers/util';
import { ColumnsType } from 'antd/es/table';

interface IProps {
  refreshList: () => void;
}
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [customAlert, setCustomAlert] = useState<A>({});
  const [searchUserValue, setSearchUserValue] = useState<string>('');
  const [selectLoading, setSelectLoading] = useState<boolean>(false);
  const userDebounced = useDebounce(searchUserValue, 300);
  const [userList, setUserList] = useState<A>([]);
  const [memberList, setMemberList] = useState<A>([
    {
      id: 1,
      key: 1,
      fullName: 'Sen',
      job: 'Developer',
      gender: 'Male',
      photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg'
    },
    {
      id: 2,
      key: 2,
      fullName: 'Sen',
      job: 'Developer',
      gender: 'Male',
      photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg'
    }
  ]);
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
    setOpen(false);
  };

  const onFinish = async (val: A) => {
    try {
      const result = await service.departmentService.create(val);
      closeDrawer();
      props.refreshList();
      console.log(result);
    } catch (e: A) {
      if (e.response?.data.status === 422) {
        const errors: A = e.response.data.errors;
        setCustomAlert(errors);
      }
    }
    console.log(val);
  };

  const formRule = {
    title: [{ required: true, message: t('Common_Require_Field') }]
  };

  useEffect(() => {
    getUsers();
  }, [userDebounced]);

  const initDataGrid: Common.IDataGrid = {
    pageInfor: {
      pageSize: 10,
      pageNumber: 1,
      totalItems: 0
    },
    searchInfor: {
      searchValue: '',
      searchColumn: ['FullName']
    },
    filter: [{ key: 'Status', value: [EState.Activate] }]
  };

  const getUsers = async () => {
    try {
      const draftParam = { ...initDataGrid };
      draftParam.searchInfor!.searchValue = userDebounced ?? '';
      const result = await service.accountService.getAccount(draftParam);
      const optionsValue = result.data.map((x: A) => ({
        label: x.fullName,
        value: x.id
      }));
      setUserList(optionsValue);
      setSelectLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onMemberSelect = async (val: A) => {
    try {
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
      const result = await service.accountService.getDetal(val);
      setMemberList([
        ...memberList,
        {
          id: 3,
          key: 3,
          fullName: 'Sen',
          job: 'Developer',
          gender: 'Male',
          photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg'
        }
      ]);
      // setMemberList([...memberList, ...result.data]);
      setSelectLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onMemberRemove = (id: string) => {
    setMemberList(memberList.filter((x: A) => x.id !== id));
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
                {record.fullName.charAt(0)}
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
        title={isEdit ? 'Edit Department' : 'Add Department'}
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
          <Form.Item
            name="title"
            label="Title"
            rules={formRule.title}
            className={customAlert?.title && 'customFieldAlert'}
          >
            <Input maxLength={250} showCount onChange={() => setCustomAlert({ ...customAlert, title: '' })} />
          </Form.Item>
          <div className="customAlert">{customAlert?.title && t('Manage_Account_Exist_Email')}</div>
          <Form.Item
            name="manager"
            label="Manager"
            rules={formRule.title}
            className={customAlert?.title && 'customFieldAlert'}
          >
            <Select
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
            />
          </Form.Item>
          <Form.Item name="description" label={t('Common_Description')}>
            <TextArea maxLength={1000} showCount />
          </Form.Item>
          <Form.Item label={t('members')}>
            <div>
              <Select
                style={{ width: '100%', marginBottom: 10 }}
                size="large"
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
              <Table
                columns={columns}
                dataSource={memberList}
                pagination={{
                  pageSize: 5,
                  total: memberList.length
                }}
              ></Table>
            </div>
          </Form.Item>
          <div className="actionBtnBottom">
            <Button onClick={closeDrawer}>{t('Common_Cancel')}</Button>
            <Button type="primary" htmlType="submit">
              {t('Common_Save')}
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
