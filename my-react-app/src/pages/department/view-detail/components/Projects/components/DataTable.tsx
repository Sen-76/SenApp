import { SmileOutlined, SolutionOutlined } from '@ant-design/icons';
import { Button, Table, Tooltip } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import styles from '../Project.module.scss';
import { useTranslation } from 'react-i18next';
import Paragraph from 'antd/es/typography/Paragraph';
import { useState } from 'react';

interface IProps {
  data: A[];
  refreshList: () => void;
  loading: boolean;
}
function DataTable(props: IProps) {
  const { loading } = props;
  const { t } = useTranslation();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 20,
    simple: false
  });

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
    props.refreshList();
  };

  const columns: ColumnsType<A> = [
    {
      title: t('Common_Title'),
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => {
        return (
          <Tooltip
            placement="bottom"
            title={<div className={styles.customTooltip}>{record.name}</div>}
            color="#ffffff"
            arrow={true}
          >
            <div style={{ display: 'flex', alignItems: 'center', minWidth: 250 }}>
              <Paragraph
                className={styles.paragraph}
                ellipsis={{ rows: 3, expandable: false }}
                style={{ maxWidth: 150, minWidth: 30 }}
              >
                {record.title}
              </Paragraph>
            </div>
          </Tooltip>
        );
      }
    },
    {
      title: t('Common_Description'),
      dataIndex: 'description',
      key: 'description',
      render: (_, record) => {
        return record.description;
      }
    },
    {
      title: t('progress'),
      dataIndex: 'progress',
      key: 'progress',
      render: (_, record) => {
        return record.progress;
      }
    },
    {
      title: t('Common_Action'),
      dataIndex: 'action',
      key: 'action',
      className: 'actionCollumn',
      fixed: 'right',
      width: 130,
      render: (_, record) => {
        return (
          <div>
            <Tooltip
              placement="bottom"
              title={<div className={styles.customTooltip}>{t('Common_ViewDetail')}</div>}
              color="#ffffff"
              arrow={true}
            >
              <Button type="text" onClick={() => console.log(record)} icon={<SolutionOutlined />} />
            </Tooltip>
          </div>
        );
      }
    }
  ];

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
      />
    </>
  );
}

export default DataTable;
