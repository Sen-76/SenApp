import { EditOutlined, InfoCircleOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Input, Table, Tooltip } from 'antd';
import styles from '../Department.module.scss';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import Paragraph from 'antd/es/typography/Paragraph';

interface IProps {
  data: A[];
  openPanel: (data?: A) => void;
  loading: boolean;
  onSearch: (value: string) => void;
  setPage: (paging: number) => void;
  param: Common.IDataGrid;
}
function DataTable(props: IProps) {
  const { loading, data, param } = props;
  const { Search } = Input;
  const { t } = useTranslation();

  const columns: ColumnsType<A> = [
    {
      title: t('Common_Title'),
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (_, record) => {
        return (
          <Tooltip placement="bottom" title={record.userEmail} color="#ffffff" arrow={true}>
            <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ minWidth: 100 }}>
              {record.title}
            </Paragraph>
          </Tooltip>
        );
      }
    },
    {
      title: t('Common_Description'),
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (_, record) => {
        return (
          <Tooltip placement="bottom" title={record.userEmail} color="#ffffff" arrow={true}>
            <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ minWidth: 100 }}>
              {record.description}
            </Paragraph>
          </Tooltip>
        );
      }
    },
    {
      title: t('Department_Manger'),
      dataIndex: 'manager',
      width: 200,
      key: 'manager',
      render: (_, record) => record.owner
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
            <Tooltip placement="bottom" title={t('Common_Edit')} color="#ffffff" arrow={true}>
              <Button type="text" onClick={editClick} icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip placement="bottom" title={t('Common_ViewDetail')} color="#ffffff" arrow={true}>
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
    props.setPage(pagination.current ?? 1);
  };

  const onSearch = (val: A) => {
    props.onSearch(val);
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
        dataSource={data}
        scroll={{ x: 780 }}
        pagination={{
          current: param.pageInfor!.pageNumber,
          pageSize: param.pageInfor!.pageSize,
          total: param.pageInfor!.totalItems,
          simple: false
        }}
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
