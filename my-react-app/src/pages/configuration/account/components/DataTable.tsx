import { useState } from 'react';
import { Avatar, Button, Input, Modal, Radio, RadioChangeEvent, Switch, Table, Tooltip, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TablePaginationConfig, TableRowSelection } from 'antd/es/table/interface';
import styles from '../AccountConfiguration.module.scss';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  FilterOutlined,
  ManOutlined,
  PlusOutlined,
  SmileOutlined,
  WomanOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { EState } from '../AccountConfiguration.Model';
import { useLoading } from '../../../../common/context/useLoading';
import { Link } from 'react-router-dom';
import Paragraph from 'antd/es/typography/Paragraph';
import { useTranslation } from 'react-i18next';

interface IProps {
  data: A[];
  openPanel: (data?: A) => void;
  openFilterPanel: (data?: A) => void;
}
function DataTable(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<A[]>([]);
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const [choosenUser, setChoosenUser] = useState<A>();
  const { showLoading, closeLoading } = useLoading();
  const [value, setValue] = useState<number>(0);
  const { t } = useTranslation();
  const { confirm } = Modal;
  const { Search } = Input;
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 20,
    simple: false
  });

  const columns: ColumnsType<A> = [
    {
      title: `${t('name')}`,
      dataIndex: 'fullname',
      key: 'fullname',
      width: 150,
      render: (_, record) => {
        return (
          <Tooltip
            placement="bottom"
            title={<div className={styles.customTooltip}>{record.fullName}</div>}
            color="#ffffff"
            arrow={true}
          >
            <div style={{ display: 'flex', alignItems: 'center', minWidth: 250 }}>
              <Avatar size={40} src={record.photoUrl} style={{ marginRight: 10 }} />
              <Paragraph
                className={styles.paragraph}
                ellipsis={{ rows: 3, expandable: false }}
                style={{ maxWidth: 150, minWidth: 30 }}
              >
                {record.fullName}
              </Paragraph>
            </div>
          </Tooltip>
        );
      }
    },
    {
      title: `${t('email')}`,
      dataIndex: 'email',
      width: 150,
      key: 'email',
      render: (_, record) => {
        return (
          <Tooltip
            placement="bottom"
            title={<div className={styles.customTooltip}>{record.email}</div>}
            color="#ffffff"
            arrow={true}
          >
            <Paragraph
              className={styles.paragraph}
              ellipsis={{ rows: 3, expandable: false }}
              style={{ maxWidth: 150, minWidth: 100 }}
            >
              <Link to={`mailto:${record.email}`}>{record.email}</Link>
            </Paragraph>
          </Tooltip>
        );
      }
    },
    {
      title: `${t('phone')}`,
      dataIndex: 'phone',
      width: 110,
      key: 'phone',
      render: (_, record) => {
        return record.phone;
      }
    },
    {
      title: `${t('date of birth')}`,
      dataIndex: 'dob',
      width: 120,
      key: 'dob',
      render: (_, record) => {
        return <div style={{ width: 115 }}>{dayjs(record.dob).format('DD MMM YYYY')}</div>;
      }
    },
    {
      title: `${t('gender')}`,
      dataIndex: 'gender',
      width: 90,
      key: 'gender',
      render: (_, record) => {
        return record.gender === 'Male' ? (
          <Tooltip
            placement="bottom"
            title={<div className={styles.customTooltip}>{t('man')}</div>}
            color="#ffffff"
            arrow={true}
          >
            <ManOutlined />
          </Tooltip>
        ) : (
          <Tooltip
            placement="bottom"
            title={<div className={styles.customTooltip}>{t('woman')}</div>}
            color="#ffffff"
            arrow={true}
          >
            <WomanOutlined />
          </Tooltip>
        );
      }
    },
    {
      title: `${t('role')}`,
      dataIndex: 'role',
      width: 100,
      key: 'role',
      render: (_, record) => {
        return record.role;
      }
    },
    {
      title: `${t('status')}`,
      dataIndex: 'status',
      width: 110,
      key: 'status',
      render: (_, record) => {
        const apiHandle = async (value: boolean) => {
          try {
            showLoading();
            notification.open({
              message: value ? 'Activated Successfully.' : 'Deactivated Successfully.',
              type: 'success'
            });
            closeLoading();
          } catch (e) {
            console.log(e);
          }
        };
        const activeChange = async (value: boolean) => {
          if (!value) {
            confirm({
              content: `Are you sure you wish to deactivate ${record.fullName} value?`,
              title: 'Confirm',
              onOk: async () => {
                await apiHandle(value);
              }
            });
          } else {
            await apiHandle(value);
          }
        };
        return (
          <div>
            <Tooltip
              placement="bottom"
              title={
                <div className={styles.customTooltip}>
                  {record.status === EState.Activate.toString() ? t('activate') : t('inactivate')}
                </div>
              }
              color="#ffffff"
              arrow={true}
            >
              <Switch
                checked={record.status === EState.Activate.toString()}
                onChange={activeChange}
                style={{ marginRight: 5 }}
              />
            </Tooltip>
          </div>
        );
      }
    },
    {
      title: `${t('action')}`,
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 140,
      className: 'actionCollumn',
      render: (_, record) => {
        const editClick = () => {
          props.openPanel(record);
        };
        return (
          <div style={{ width: 100 }}>
            <Tooltip
              placement="bottom"
              title={<div className={styles.customTooltip}>{t('edit')}</div>}
              color="#ffffff"
              arrow={true}
            >
              <Button type="text" onClick={editClick} icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip
              placement="bottom"
              title={<div className={styles.customTooltip}>{t('delete')}</div>}
              color="#ffffff"
              arrow={true}
            >
              <Button
                type="text"
                onClick={() => {
                  setIsOpenModal(true);
                  setChoosenUser(record);
                }}
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </div>
        );
      }
    }
  ];

  const rowSelection: TableRowSelection<A> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedItem(selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(selected, selectedRows, record);
      setSelectedItem(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
      setSelectedItem(selectedRows);
    },
    getCheckboxProps: (record: A) => ({
      disabled: record.name === 'Disabled User',
      name: record.name
    })
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
    tableLoading();
  };

  const tableLoading = () => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
      clearTimeout(timeout);
    }, 2000);
  };

  const onSearch = (val: A) => {
    console.log(val);
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(Number(e.target.value));
  };

  const onCancelModal = () => {
    setIsOpenModal(false);
    setChoosenUser(null);
    setValue(0);
  };

  const confirmDelete = () => {
    console.log(selectedItem);
    notification.open({
      message: 'Delete thử thôi chứ k xóa đc đâu :")',
      type: 'success'
    });
  };

  const TableHeader = () => {
    return (
      <>
        <div className={styles.tableHeaderLeft}>
          <Button type="text" onClick={() => props.openPanel()} icon={<PlusOutlined />}>
            {t('add new')}
          </Button>
          <Button
            onClick={() => setIsOpenModal(true)}
            loading={loading}
            type="text"
            icon={<DeleteOutlined />}
            disabled={selectedItem.length === 0}
          >
            {t('delete selected')}
          </Button>
        </div>
        <div className={styles.tableHeaderRight}>
          <Tooltip
            placement="bottom"
            title={<div className={styles.customTooltip}>{t('filter')}</div>}
            color="#ffffff"
            arrow={true}
          >
            <Button type="text" onClick={() => props.openFilterPanel()} icon={<FilterOutlined />} />
          </Tooltip>
          <Search placeholder={t('search by name')} allowClear onSearch={onSearch} style={{ width: 250 }} />
        </div>
      </>
    );
  };

  return (
    <>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={props.data}
        pagination={pagination}
        scroll={{ x: 780 }}
        locale={{
          emptyText: (
            <>
              <SmileOutlined style={{ marginRight: 5 }} /> There are no records to display.
            </>
          )
        }}
        loading={loading}
        onChange={handleTableChange}
        title={() => TableHeader()}
      />
      <Modal
        title={
          <>
            <ExclamationCircleFilled style={{ marginRight: 10, color: '#d0cf23', fontSize: 20 }} />
            <span>Confirm Delete</span>
          </>
        }
        open={isModalOpen}
        footer={<></>}
        onCancel={onCancelModal}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 16, margin: '10px 0' }}>
            {choosenUser
              ? t('do you wanna delete this user?').replaceAll('{0}', choosenUser.fullName)
              : t('do you want to delete those users?')}
          </div>
          <Radio.Group
            onChange={onChange}
            style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 60, marginLeft: 20 }}
            value={value}
          >
            <Radio value={1}>{t('hard delete')}</Radio>
            <Radio value={2}>{t('soft delete')}</Radio>
          </Radio.Group>
          <div className="actionBtnBottom">
            <Button onClick={onCancelModal}>Cancel</Button>
            <Button type="primary" disabled={value === 0} onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DataTable;
