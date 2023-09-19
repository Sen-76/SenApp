import {
  ExclamationCircleFilled,
  LogoutOutlined,
  PlusOutlined,
  SmileOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { Avatar, Button, Modal, Table, TablePaginationConfig, Tooltip, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import styles from '../Member.module.scss';
import { useTranslation } from 'react-i18next';
import Paragraph from 'antd/es/typography/Paragraph';
import Search from 'antd/es/input/Search';
import { TableRowSelection } from 'antd/es/table/interface';

interface IProps {
  data: A[];
  openPanel: (data?: A) => void;
  openDetailPanel: (data?: A) => void;
}
function DataTable(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<A[]>([]);
  const { confirm } = Modal;
  const { t } = useTranslation();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 20,
    simple: false
  });

  const columns: ColumnsType<A> = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return (
          <Tooltip
            placement="bottom"
            title={<div className={styles.customTooltip}>{record.name}</div>}
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
                {record.name}
              </Paragraph>
            </div>
          </Tooltip>
        );
      }
    },
    {
      title: t('gender'),
      dataIndex: 'gender',
      key: 'gender',
      render: (_, record) => {
        return record.gender;
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
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      className: 'actionCollumn',
      fixed: 'right',
      width: 130,
      render: (_, record) => {
        const viewDetailCLick = () => {
          props.openDetailPanel(record);
        };

        return (
          <div>
            <Tooltip
              placement="bottom"
              title={<div className={styles.customTooltip}>{t('view detail')}</div>}
              color="#ffffff"
              arrow={true}
            >
              <Button type="text" onClick={viewDetailCLick} icon={<SolutionOutlined />} />
            </Tooltip>
            <Tooltip
              placement="bottom"
              title={<div className={styles.customTooltip}>{t('Common_Kick')}</div>}
              color="#ffffff"
              arrow={true}
            >
              <Button type="text" onClick={kickoutMembers} icon={<LogoutOutlined />} />
            </Tooltip>
          </div>
        );
      }
    }
  ];

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

  const kickoutMembers = () => {
    confirm({
      content: `Are you sure you wish to kickout those members?`,
      title: 'Confirm',
      okText: t('Common_Kick'),
      onOk() {
        tableLoading();
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

  const TableHeader = () => {
    return (
      <>
        <div className={styles.tableHeaderLeft}>
          <Button type="text" onClick={() => props.openPanel()} icon={<PlusOutlined />}>
            {t('Common_AssignMember')}
          </Button>
          <Button
            onClick={kickoutMembers}
            loading={loading}
            type="text"
            icon={<LogoutOutlined />}
            disabled={selectedItem.length === 0}
          >
            {t('Common_Kick')}
          </Button>
        </div>
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
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(selected, selectedRows, record);
      setSelectedItem(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
      setSelectedItem(selectedRows);
    }
  };

  return (
    <div className={styles.members}>
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
    </div>
  );
}

export default DataTable;
