import { EditOutlined, InfoCircleOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Input, Table, Tooltip } from 'antd';
import styles from '../Department.module.scss';
import { useState } from 'react';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface IProps {
  data: A[];
  openPanel: (data?: A) => void;
}
function DataTable(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { Search } = Input;
  const { t } = useTranslation();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 20,
    simple: false
  });

  const columns: ColumnsType<A> = [
    {
      title: t('Common_Title'),
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (_, record) => {
        return record.title;
      }
    },
    {
      title: t('Common_Description'),
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (_, record) => {
        return record.description;
      }
    },
    {
      title: t('Common_ModifiedOn'),
      dataIndex: 'modifiedOn',
      key: 'modifiedOn',
      width: 200,
      render: (_, record) => {
        return <div style={{ minWidth: 90 }}>{dayjs(record.updatedDate).format('DD MMM YYYY HH:mm')}</div>;
      }
    },
    {
      title: t('Common_ModifiedBy'),
      dataIndex: 'modifiedBy',
      width: 200,
      key: 'modifiedBy',
      render: (_, record) => record.modifiedBy
    },
    {
      title: t('Common_Action'),
      dataIndex: 'action',
      key: 'action',
      className: 'actionCollumn',
      fixed: 'right',
      width: 130,
      render: (_, record) => {
        const editClick = () => {
          props.openPanel(record);
        };
        return (
          <div>
            <Tooltip
              placement="bottom"
              title={<div className={styles.customTooltip}>{t('Common_Edit')}</div>}
              color="#ffffff"
              arrow={true}
            >
              <Button type="text" onClick={editClick} icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip
              placement="bottom"
              title={<div className={styles.customTooltip}>{t('Common_ViewDetail')}</div>}
              color="#ffffff"
              arrow={true}
            >
              <Link to={`/management/department-management/department-detail/${record.title}/${record.id}`}>
                <Button type="text" icon={<InfoCircleOutlined />} />
              </Link>
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

  const TableHeader = () => {
    return (
      <>
        <div className={styles.tableHeaderLeft}>
          <Button type="text" onClick={() => props.openPanel()} icon={<PlusOutlined />}>
            {t('Common_AddNew')}
          </Button>
        </div>
        <div className={styles.tableHeaderRight}>
          <Search placeholder="Search Name" allowClear onSearch={onSearch} style={{ width: 250 }} />
        </div>
      </>
    );
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={props.data}
        pagination={pagination}
        scroll={{ x: 780 }}
        locale={{
          emptyText: (
            <>
              <SmileOutlined style={{ marginRight: 5 }} /> {t('Common_NoRecord')}
            </>
          )
        }}
        loading={loading}
        onChange={handleTableChange}
        title={() => TableHeader()}
        rowKey={(record) => record.id}
      />
    </>
  );
}

export default DataTable;
