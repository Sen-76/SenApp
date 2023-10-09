import { DeleteOutlined, EditOutlined, PlusOutlined, SmileOutlined, SolutionOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, Table, TablePaginationConfig, Tooltip, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import styles from '../Teams.module.scss';
import { useTranslation } from 'react-i18next';
import Paragraph from 'antd/es/typography/Paragraph';
import Search from 'antd/es/input/Search';
import { TableRowSelection } from 'antd/es/table/interface';
import { util } from '@/common/helpers/util';

interface IProps {
  data: A[];
  openPanel: (data?: A) => void;
  openDetailPanel: (data?: A) => void;
  refreshList: () => void;
  loading: boolean;
}
function DataTable(props: IProps) {
  const { loading } = props;
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
          <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ maxWidth: 150, minWidth: 30 }}>
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
          <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size={40}>
            {record.members.map((user: A) => (
              <Avatar key={user.id} src={record.photoUrl} style={{ backgroundColor: util.randomColor() }}>
                {user.fullName.charAt(0)}
              </Avatar>
            ))}
          </Avatar.Group>
        );
      }
    },
    {
      title: t('Common_Description'),
      dataIndex: 'job',
      key: 'job',
      render: (_, record) => {
        return record.description;
      }
    },
    {
      title: t('Common_Action'),
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      className: 'actionCollumn',
      width: 200,
      render: (_, record) => {
        return (
          <div>
            <Tooltip placement="bottom" title={t('Common_ViewDetail')} color="#ffffff" arrow={true}>
              <Button type="text" onClick={() => props.openDetailPanel(record)} icon={<SolutionOutlined />} />
            </Tooltip>
            <Tooltip placement="bottom" title={t('Common_Edit')} color="#ffffff" arrow={true}>
              <Button type="text" onClick={() => props.openPanel(record)} icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip placement="bottom" title={t('Common_Delete')} color="#ffffff" arrow={true}>
              <Button type="text" onClick={() => deleteTeam(record)} icon={<DeleteOutlined />} />
            </Tooltip>
          </div>
        );
      }
    }
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
    props.refreshList();
  };

  const onSearch = (val: A) => {
    props.refreshList();
    console.log(val);
  };

  const rowSelection: TableRowSelection<A> = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedItem(selectedRows);
    }
  };

  const deleteTeam = (user?: A) => {
    confirm({
      content: user.id
        ? t('Department_Team_DeleteSingle_Remind_Text').replace('{0}', user.name)
        : t('Department_Team_DeleteMultyple_Remind_Text'),
      title: t('Common_Confirm'),
      okText: t('Common_Delete'),
      cancelText: t('Common_Cancel'),
      onOk() {
        props.refreshList();
        notification.open({
          message: t('Common_DeleteSuccess'),
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
          <Button onClick={deleteTeam} type="text" icon={<DeleteOutlined />} disabled={selectedItem.length === 0}>
            {t('Common_DeleteSelected')}
          </Button>
        </div>
        <div className={styles.tableHeaderRight}>
          <Search placeholder={t('Common_SearchByName')} allowClear onSearch={onSearch} style={{ width: 250 }} />
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
              <SmileOutlined style={{ marginRight: 5 }} /> {t('Common_NoRecord')}
            </>
          )
        }}
        loading={loading}
        onChange={handleTableChange}
        rowKey={(record) => record.id}
      />
    </div>
  );
}

export default DataTable;
