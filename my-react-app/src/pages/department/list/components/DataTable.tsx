import { EditOutlined, InfoCircleOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Input, Table, Tooltip } from 'antd';
import styles from '../Department.module.scss';
import { useState } from 'react';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
      title: t('title'),
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => {
        return record.title;
      }
    },
    {
      title: t('description'),
      dataIndex: 'description',
      key: 'description',
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
        const editClick = () => {
          props.openPanel(record);
        };
        return (
          <div>
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
              title={<div className={styles.customTooltip}>{t('view detail')}</div>}
              color="#ffffff"
              arrow={true}
            >
              <Link to={`/department/department-detail/${record.id}`}>
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
            {t('add new')}
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
