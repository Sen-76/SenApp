import {
  EditOutlined,
  ExportOutlined,
  FilterOutlined,
  PlusOutlined,
  SmileOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { Button, Table, Tag, Tooltip, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import styles from '../Project.module.scss';
import Search from 'antd/es/input/Search';
import Paragraph from 'antd/es/typography/Paragraph';
import dayjs from 'dayjs';
import { EStatus } from '../Project.model';
import { Link } from 'react-router-dom';

interface IProps {
  data: A[];
  loading: boolean;
  param: Common.IDataGrid;
  openPanel: (data?: A) => void;
  openFilterPanel: (data?: A) => void;
}
function DataTable(props: IProps) {
  const { loading, param, data } = props;
  const { t } = useTranslation();
  const columns: ColumnsType<A> = [
    {
      title: t('Common_Title'),
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => {
        return (
          <Tooltip placement="bottom" title={record.title} color="#ffffff" arrow={true}>
            <Paragraph ellipsis={{ rows: 1, expandable: false }}>{record.title}</Paragraph>
          </Tooltip>
        );
      }
    },
    {
      title: t('team'),
      dataIndex: 'team',
      key: 'team',
      render: (_, record) => {
        return record.team;
      }
    },
    {
      title: t('department'),
      dataIndex: 'department',
      key: 'department',
      render: (_, record) => {
        return record.department;
      }
    },
    {
      title: t('Project_StartDate'),
      dataIndex: 'startdate',
      key: 'startdate',
      render: (_, record) => {
        return dayjs(record.startdate).format('DD MMM YYYY');
      }
    },
    {
      title: t('Project_DueDate'),
      dataIndex: 'duedate',
      key: 'duedate',
      render: (_, record) => {
        return dayjs(record.duedate).format('DD MMM YYYY');
      }
    },
    {
      title: t('Project_Status'),
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        return (
          <>
            {record.status === EStatus.InProgress && <Tag color="blue">In Progress</Tag>}
            {record.status === EStatus.Closed && <Tag color="black">Closed</Tag>}
            {record.status === EStatus.Done && <Tag color="green">Done</Tag>}
          </>
        );
      }
    },
    {
      title: t('Common_Action'),
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      className: 'actionCollumn',
      width: 180,
      render: (_, record) => {
        const editClick = () => {
          props.openPanel(record);
        };
        return (
          <div>
            <Tooltip placement="bottom" title={t('Common_ViewDetail')} color="#ffffff" arrow={true}>
              <Link to={`/projects/detail/${record.id}/${record.title}`}>
                <Button type="text" icon={<SolutionOutlined />} />
              </Link>
            </Tooltip>
            <Tooltip placement="bottom" title={t('Common_Edit')} color="#ffffff" arrow={true}>
              <Button type="text" onClick={editClick} icon={<EditOutlined />} />
            </Tooltip>
          </div>
        );
      }
    }
  ];

  const onSearch = (val: A) => {
    console.log(val);
  };

  const TableHeader = () => {
    return (
      <>
        <div className={styles.tableHeaderLeft}>
          <Button type="text" onClick={props.openPanel} icon={<PlusOutlined />}>
            {t('Common_AddNew')}
          </Button>
          <Button type="text" onClick={exportExcel} icon={<ExportOutlined />}>
            {t('Common_ExportExcel')}
          </Button>
        </div>
        <div className={styles.tableHeaderRight}>
          <Tooltip placement="bottom" title={t('Common_Filter')} color="#ffffff" arrow={true}>
            <Button type="text" onClick={() => props.openFilterPanel(param.filter)} icon={<FilterOutlined />} />
          </Tooltip>
          <Search placeholder={t('Common_SearchByTitle')} allowClear onSearch={onSearch} style={{ width: 250 }} />
        </div>
      </>
    );
  };

  const exportExcel = () => {
    notification.open({
      message: t('Common_ExportSuccess'),
      type: 'success'
    });
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 780 }}
        locale={{
          emptyText: (
            <>
              <SmileOutlined style={{ marginRight: 5 }} /> {t('Common_NoRecord')}
            </>
          )
        }}
        loading={loading}
        title={() => TableHeader()}
        rowKey={(record) => record.id}
      />
    </>
  );
}

export default DataTable;
