import { EditOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import styles from '../FileConfiguration.module.scss';
import Search from 'antd/es/input/Search';

interface IProps {
  data: A[];
  openPanel: (data?: A) => void;
  loading: boolean;
}
function DataTable(props: IProps) {
  const { loading, data } = props;
  const { t } = useTranslation();
  const columns: ColumnsType<A> = [
    {
      title: t('Common_Title'),
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
      title: t('file accept'),
      dataIndex: 'fileAccept',
      width: 110,
      key: 'fileAccept',
      render: (_, record) => {
        return record.fileAccept;
      }
    },
    {
      title: t('file type'),
      dataIndex: 'fileType',
      width: 110,
      key: 'fileType',
      render: (_, record) => {
        return record.fileType ? 'Multiple' : 'Single';
      }
    },
    {
      title: t('Common_Action'),
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
        <div className={styles.tableHeaderLeft}></div>
        <div className={styles.tableHeaderRight}>
          <Search placeholder={t('Common_SearchByTitle')} allowClear onSearch={onSearch} style={{ width: 250 }} />
        </div>
      </>
    );
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
