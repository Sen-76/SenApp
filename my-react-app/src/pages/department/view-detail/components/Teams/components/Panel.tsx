import { CloseOutlined, ExclamationCircleFilled, LogoutOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Form, Input, Modal, Table, Tooltip, notification } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../Teams.module.scss';
import { ColumnsType } from 'antd/es/table';
import Paragraph from 'antd/es/typography/Paragraph';
import { useTranslation } from 'react-i18next';
import Search from 'antd/es/input/Search';
import { TablePaginationConfig, TableRowSelection } from 'antd/es/table/interface';
import { useLoading } from '../../../../../../common/context/useLoading';

interface IProps {
  refreshList: () => void;
}
const draftUserList = [
  {
    id: 6,
    key: 6,
    name: 'Sen 6',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  },
  {
    id: 7,
    key: 7,
    name: 'Sen 7',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  },
  {
    id: 8,
    key: 8,
    name: 'Sen 8',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  },
  {
    id: 9,
    key: 9,
    name: 'Sen 9',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  },
  {
    id: 10,
    key: 10,
    name: 'Sen 10',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg',
    description: 'N/A'
  }
];
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const [open2nd, setOpen2nd] = useState<boolean>(false);
  const [loading2nd, setLoading2nd] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<A>(false);
  const [selectedItem, setSelectedItem] = useState<A[]>([]);
  const { showLoading, closeLoading } = useLoading();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 20,
    simple: false
  });
  const { confirm } = Modal;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    openDrawer
  }));

  const getAllMemberInDepartment = () => {
    setLoading2nd(true);
    const timeout = setTimeout(() => {
      setLoading2nd(false);
      clearTimeout(timeout);
    }, 2000);
  };

  const openDrawer = (data?: A) => {
    setOpen(true);
    setIsEdit(false);
    setEditData({ members: [] });
    if (data) {
      setEditData(data);
      console.log(data);
      form.setFieldsValue(data);
      setIsEdit(true);
    }
  };

  const open2ndDrawer = () => {
    setOpen2nd(true);
    setSelectedItem([]);
    getAllMemberInDepartment();
  };

  const closeDrawer = () => {
    setOpen(false);
    setEditData({});
    form.resetFields();
  };

  const close2ndDrawer = () => {
    setOpen2nd(false);
  };

  const handleTable2ndChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
    getAllMemberInDepartment();
  };

  const assignCLick = (user?: A) => {
    user.id
      ? setEditData({ ...editData, members: [...editData.members, user] })
      : setEditData({ ...editData, members: [...editData.members, ...selectedItem] });
    getAllMemberInDepartment();
    setSelectedItem([]);
    notification.open({
      message: t('Common_AssignSuccess'),
      type: 'success'
    });
  };

  const columns: ColumnsType<A> = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (_, record) => {
        return (
          <Tooltip
            placement="bottom"
            title={<div className={styles.customTooltip}>{record.name}</div>}
            color="#ffffff"
            arrow={true}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size={40} src={record.photoUrl} style={{ marginRight: 10 }} />
              <Paragraph
                className={styles.paragraph}
                ellipsis={{ rows: 3, expandable: false }}
                style={{ maxWidth: 150, minWidth: 30 }}
              >
                {record.name}
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
      width: 250,
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
      width: 160,
      render: (_, record) => {
        const kickoutCLick = () => {
          confirm({
            title: t('Common_Kick'),
            icon: <ExclamationCircleFilled />,
            content: t('Department_Team_KickGroup_Remind_Text').replace('{0}', record.name),
            okText: t('Common_Kick'),
            cancelText: t('Common_Cancel'),
            onOk() {
              setEditData({ ...editData, members: editData.members.filter((x: A) => x.id !== record.id) });
              notification.open({
                message: t('Common_KickSuccess'),
                type: 'success'
              });
            },
            onCancel() {
              console.log('Cancel');
            }
          });
        };

        return (
          <div>
            {open2nd ? (
              <Tooltip
                placement="bottom"
                title={<div className={styles.customTooltip}>{t('Common_Assign')}</div>}
                color="#ffffff"
                arrow={true}
              >
                <Button type="text" onClick={() => assignCLick(record)} icon={<PlusOutlined />} />
              </Tooltip>
            ) : (
              <Tooltip
                placement="bottom"
                title={<div className={styles.customTooltip}>{t('Common_Kick')}</div>}
                color="#ffffff"
                arrow={true}
              >
                <Button type="text" onClick={kickoutCLick} icon={<LogoutOutlined />} />
              </Tooltip>
            )}
          </div>
        );
      }
    }
  ];

  const formRule = {
    title: [{ required: true, message: t('Common_Require_Field') }]
  };

  const onSearch = (val: A) => {
    console.log(val);
    getAllMemberInDepartment();
  };

  const TableHeader = () => {
    return (
      <>
        <div className={styles.tableHeaderLeft}></div>
        <div className={styles.tableHeaderRight}>
          <Search placeholder="Search Name" allowClear onSearch={onSearch} style={{ width: 250 }} />
        </div>
      </>
    );
  };

  const rowSelection: TableRowSelection<A> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedItem(selectedRows);
    }
  };

  const onFinish = (val: A) => {
    console.log({ ...editData, ...val });
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
            <Input maxLength={250} showCount />
          </Form.Item>
          <Form.Item name="description" label={t('Common_Description')}>
            <Input.TextArea maxLength={1000} showCount />
          </Form.Item>
          <Form.Item
            className={styles.member}
            label={
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <span>{t('members')}</span>
                <Button type="text" onClick={open2ndDrawer} icon={<PlusOutlined />}>
                  {t('Common_AssignMember')}
                </Button>
              </div>
            }
          >
            <Table
              columns={columns}
              pagination={pagination}
              dataSource={editData.members}
              locale={{
                emptyText: (
                  <>
                    <SmileOutlined style={{ marginRight: 5 }} /> {t('Common_NoMember')}
                  </>
                )
              }}
            />
          </Form.Item>
          <div className="actionBtnBottom">
            <Button onClick={closeDrawer}>{t('Common_Cancel')}</Button>
            <Button type="primary" htmlType="submit">
              {t('Common_Confirm')}
            </Button>
          </div>
        </Form>
        <Drawer
          title={t('Common_AssignMember')}
          width={500}
          closable={false}
          onClose={close2ndDrawer}
          maskClosable={false}
          open={open2nd}
          className={styles.drawer}
          extra={<CloseOutlined onClick={close2ndDrawer} />}
        >
          <Table
            columns={columns}
            pagination={pagination}
            dataSource={draftUserList}
            rowSelection={{ ...rowSelection }}
            loading={loading2nd}
            title={() => TableHeader()}
            onChange={handleTable2ndChange}
            locale={{
              emptyText: (
                <>
                  <SmileOutlined style={{ marginRight: 5 }} /> {t('Common_NoMember')}
                </>
              )
            }}
          />
          <div className="actionBtnBottom">
            <Button onClick={close2ndDrawer}>{t('Common_Cancel')}</Button>
            <Button type="primary" onClick={assignCLick} disabled={selectedItem.length === 0}>
              {t('Common_Assign')}
            </Button>
          </div>
        </Drawer>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
