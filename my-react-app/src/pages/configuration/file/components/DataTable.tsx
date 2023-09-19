import { useState } from 'react';
import { EditOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Table, Tooltip } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import styles from '../FileConfiguration.module.scss';
import Search from 'antd/es/input/Search';

interface IProps {
  data: A[];
  openPanel: (data?: A) => void;
}
function DataTable(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 20,
    simple: false
  });
  const columns: ColumnsType<A> = [
    {
      title: `${t('title')}`,
      dataIndex: 'title',
      width: 110,
      key: 'title',
      render: (_, record) => {
        return record.title;
      }
    },
    {
      title: `${t('file size')} (MB)`,
      dataIndex: 'fileSize',
      width: 130,
      key: 'fileSize',
      render: (_, record) => {
        return record.fileSize;
      }
    },
    {
      title: `${t('file accept')}`,
      dataIndex: 'enableFileExtension',
      width: 110,
      key: 'fileSize',
      render: (_, record) => {
        return record.fileAccept.join(', ');
      }
    },
    {
      title: `${t('file type')}`,
      dataIndex: 'fileOfFoder',
      width: 110,
      key: 'fileSize',
      render: (_, record) => {
        return record.numberOfFile ? 'Multiple' : 'Single';
      }
    },
    {
      title: `${t('action')}`,
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      className: 'actionCollumn',
      width: 80,
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
          <Search placeholder={t('search by title')} allowClear onSearch={onSearch} style={{ width: 250 }} />
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
