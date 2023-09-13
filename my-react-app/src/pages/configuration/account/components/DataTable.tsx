import { useState } from 'react';
import { Avatar, Button, Input, Modal, Switch, Table, Tooltip, notification } from 'antd';
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

interface IProps {
  data: A[];
  openPanel: (data?: A) => void;
  openFilterPanel: (data?: A) => void;
}
function DataTable(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<A[]>([]);
  const { showLoading, closeLoading } = useLoading();
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
      title: 'Name',
      dataIndex: 'fullname',
      key: 'fullname',
      width: 150,
      render: (_, record) => {
        return (
          <Tooltip
            placement="bottom"
            title={<div className={styles.customTooltip}>{record.fullName}</div>}
            color="#ffffff"
            arrow={false}
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
      title: 'Email',
      dataIndex: 'email',
      width: 150,
      key: 'email',
      render: (_, record) => {
        return (
          <Tooltip
            placement="bottom"
            title={<div className={styles.customTooltip}>{record.email}</div>}
            color="#ffffff"
            arrow={false}
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
      title: 'Phone',
      dataIndex: 'phone',
      width: 110,
      key: 'phone',
      render: (_, record) => {
        return record.phone;
      }
    },
    {
      title: 'Date of birth',
      dataIndex: 'dob',
      width: 120,
      key: 'dob',
      render: (_, record) => {
        return <div style={{ width: 115 }}>{dayjs(record.dob).format('DD MMM YYYY')}</div>;
      }
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: 90,
      key: 'gender',
      render: (_, record) => {
        return record.gender === 'Male' ? <ManOutlined /> : <WomanOutlined />;
      }
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: 100,
      key: 'role',
      render: (_, record) => {
        return record.role;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 80,
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
        console.log(record.status);
        return (
          <div>
            <Switch
              checked={record.status === EState.Activate.toString() ? true : false}
              onChange={activeChange}
              style={{ marginRight: 5 }}
            />
            {/* <label className={styles.mLeft10}>{record.status === EState.Activate ? 'Active' : 'Inactive'}</label> */}
          </div>
        );
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record) => {
        const editClick = () => {
          props.openPanel(record);
        };
        return (
          <div>
            <Button type="text" onClick={editClick} icon={<EditOutlined />} />
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

  const TableHeader = () => {
    const deleteSelected = () => {
      confirm({
        title: 'Do you Want to delete these items?',
        icon: <ExclamationCircleFilled />,
        content: 'Some descriptions',
        onOk() {
          tableLoading();
          console.log(selectedItem);
          notification.open({
            message: 'Delete thử thôi chứ k xóa đc đâu :")',
            type: 'success'
          });
        },
        onCancel() {
          console.log('Cancel');
        }
      });
    };
    return (
      <>
        <div className={styles.tableHeaderLeft}>
          <Button type="text" onClick={() => props.openPanel()} icon={<PlusOutlined />}>
            Add new
          </Button>
          <Button
            onClick={deleteSelected}
            loading={loading}
            type="text"
            icon={<DeleteOutlined />}
            disabled={selectedItem.length === 0}
          >
            Delete Selected
          </Button>
        </div>
        <div className={styles.tableHeaderRight}>
          <Button type="text" onClick={() => props.openFilterPanel()} icon={<FilterOutlined />} />
          <Search placeholder="Search Name" allowClear onSearch={onSearch} style={{ width: 250 }} />
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
    </>
  );
}

export default DataTable;
