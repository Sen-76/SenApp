import {
  DeleteOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  SmileOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { Avatar, Button, Modal, Table, TablePaginationConfig, Tooltip, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import styles from '../Teams.module.scss';
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
          <Paragraph
            className={styles.paragraph}
            ellipsis={{ rows: 3, expandable: false }}
            style={{ maxWidth: 150, minWidth: 30 }}
          >
            {record.name}
          </Paragraph>
        );
      }
    },
    {
      title: t('members'),
      dataIndex: 'gender',
      key: 'gender',
      render: (_, record) => {
        return (
          <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Avatar key={i} src={record.photoUrl} />
            ))}
          </Avatar.Group>
        );
      }
    },
    {
      title: t('description'),
      dataIndex: 'job',
      key: 'job',
      render: (_, record) => {
        return record.description;
      }
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
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
              title={<div className={styles.customTooltip}>{t('Common_Delete')}</div>}
              color="#ffffff"
              arrow={true}
            >
              <Button type="text" onClick={deleteTeam} icon={<DeleteOutlined />} />
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

  const deleteTeam = () => {
    confirm({
      content: `Are you sure you wish to delete those teams?`,
      title: 'Confirm',
      okText: t('Common_Delete'),
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
            {t('Common_AddNew')}
          </Button>
          <Button
            onClick={deleteTeam}
            loading={loading}
            type="text"
            icon={<DeleteOutlined />}
            disabled={selectedItem.length === 0}
          >
            {t('Common_DeleteSelected')}
          </Button>
        </div>
        <div className={styles.tableHeaderRight}>
          <Search placeholder="Search Name" allowClear onSearch={onSearch} style={{ width: 250 }} />
        </div>
      </>
    );
  };

  return (
    <div className={styles.members}>
      <Table
        rowSelection={{ ...rowSelection }}
        columns={columns}
        dataSource={props.data}
        pagination={pagination}
        scroll={{ x: 780 }}
        title={() => TableHeader()}
        locale={{
          emptyText: (
            <>
              <SmileOutlined style={{ marginRight: 5 }} /> There are no records to display.
            </>
          )
        }}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default DataTable;
