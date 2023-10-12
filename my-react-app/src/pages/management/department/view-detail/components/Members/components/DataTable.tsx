import {
  LogoutOutlined,
  ManOutlined,
  PlusOutlined,
  SmileOutlined,
  SolutionOutlined,
  WomanOutlined
} from '@ant-design/icons';
import { Avatar, Button, Modal, Table, TablePaginationConfig, Tooltip, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import styles from '../Member.module.scss';
import { useTranslation } from 'react-i18next';
import Paragraph from 'antd/es/typography/Paragraph';
import Search from 'antd/es/input/Search';
import { TableRowSelection } from 'antd/es/table/interface';
import { util } from '@/common/helpers/util';

interface IProps {
  data: A[];
  openPanel: (data?: A) => void;
  openDetailPanel: (data?: A) => void;
  setPage: (paging: number) => void;
  onSearch: (value: string) => void;
  refreshList: () => void;
  loading: boolean;
  param: Common.IDataGrid;
}
function DataTable(props: IProps) {
  const { loading, param } = props;
  const [selectedItem, setSelectedItem] = useState<A[]>([]);
  const { confirm } = Modal;
  const { t } = useTranslation();

  const columns: ColumnsType<A> = [
    {
      title: t('name'),
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, record) => {
        return (
          <Tooltip placement="bottom" title={record.fullName} color="#ffffff" arrow={true}>
            <div style={{ display: 'flex', alignItems: 'center', minWidth: 250 }}>
              <Avatar size={40} src={record.photoUrl} style={{ marginRight: 10, backgroundColor: util.randomColor() }}>
                {record.fullName?.charAt(0)}
              </Avatar>
              <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ maxWidth: 150, minWidth: 30 }}>
                {record.fullName}
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
        return record.gender === 'Male' ? (
          <Tooltip placement="bottom" title={t('man')} color="#ffffff" arrow={true}>
            <ManOutlined />
          </Tooltip>
        ) : (
          <Tooltip placement="bottom" title={t('woman')} color="#ffffff" arrow={true}>
            <WomanOutlined />
          </Tooltip>
        );
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
      title: t('Common_Action'),
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
            <Tooltip placement="bottom" title={t('Common_ViewDetail')} color="#ffffff" arrow={true}>
              <Button type="text" onClick={viewDetailCLick} icon={<SolutionOutlined />} />
            </Tooltip>
            <Tooltip placement="bottom" title={t('Common_Kick')} color="#ffffff" arrow={true}>
              <Button type="text" onClick={() => kickoutMembers(record)} icon={<LogoutOutlined />} />
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

  const kickoutMembers = (user?: A) => {
    confirm({
      content: user.id
        ? t('Department_Member_KickDepartmentSingle_Remind_Text').replace('{0}', user.name)
        : t('Department_Member_KickDepartmentMultiple_Remind_Text'),
      title: t('Common_Confirm'),
      okText: t('Common_Kick'),
      cancelText: t('Common_Cancel'),
      onOk() {
        props.refreshList();
        notification.open({
          message: t('Common_KickSuccess'),
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
          <Search placeholder={t('Common_SearchByName')} allowClear onSearch={onSearch} style={{ width: 250 }} />
        </div>
      </>
    );
  };

  const rowSelection: TableRowSelection<A> = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedItem(selectedRows);
    }
  };

  return (
    <div className={styles.members}>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={props.data}
        pagination={{
          current: param.pageInfor!.pageNumber,
          pageSize: param.pageInfor!.pageSize,
          total: param.pageInfor!.totalItems,
          simple: false
        }}
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
    </div>
  );
}

export default DataTable;
