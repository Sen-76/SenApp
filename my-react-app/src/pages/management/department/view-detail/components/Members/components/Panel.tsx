import { CloseOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Table, Tooltip } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../Member.module.scss';
import { ColumnsType } from 'antd/es/table';
import Paragraph from 'antd/es/typography/Paragraph';
import { useTranslation } from 'react-i18next';
import Search from 'antd/es/input/Search';
import { TablePaginationConfig, TableRowSelection } from 'antd/es/table/interface';
import { util } from '@/common/helpers/util';

interface IProps {
  refreshList: () => void;
}
const draftMembers = [
  {
    id: 1,
    key: 1,
    fullName: 'Sen',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg'
  },
  {
    id: 2,
    key: 2,
    fullName: 'Sen 2',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg'
  }
];
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<A[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 20,
    simple: false
  });
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    openDrawer
  }));

  const openDrawer = (data?: A) => {
    setOpen(true);
    console.log(data);
  };

  const closeDrawer = () => {
    setSelectedItem([]);
    props.refreshList();
    setOpen(false);
  };

  const columns: ColumnsType<A> = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (_, record) => {
        return (
          <Tooltip placement="bottom" title={record.name} color="#ffffff" arrow={true}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size={40} src={record.photoUrl} style={{ marginRight: 10, backgroundColor: util.randomColor() }}>
                {record.fullName.charAt(0)}
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
      title: t('job'),
      dataIndex: 'job',
      key: 'job',
      width: 250,
      render: (_, record) => {
        return record.job;
      }
    },
    {
      title: t('Common_Action'),
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      className: 'actionCollumn',
      width: 150,
      render: (_, record) => {
        return (
          <div>
            <Tooltip placement="bottom" title={t('Common_Assign')} color="#ffffff" arrow={true}>
              <Button type="text" onClick={() => assignCLick(record)} icon={<PlusOutlined />} />
            </Tooltip>
          </div>
        );
      }
    }
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const onSearch = (val: A) => {
    console.log(val);
  };

  const assignCLick = (user?: A) => {
    console.log(user);
    setSelectedItem([]);
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
      clearTimeout(timeout);
    }, 2000);
  };

  const TableHeader = () => {
    return (
      <>
        <div className={styles.tableHeaderLeft}></div>
        <div className={styles.tableHeaderRight}>
          <Search placeholder="Search Name" allowClear onSearch={onSearch} style={{ width: 250 }} />
        </div>
      </>
    );
  };

  const rowSelection: TableRowSelection<A> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedItem(selectedRows);
    }
  };

  return (
    <>
      <Drawer
        title={t('Common_AssignMember')}
        placement="right"
        open={open}
        extra={<CloseOutlined onClick={closeDrawer} />}
        onClose={closeDrawer}
        maskClosable={false}
        closable={false}
        width={520}
        destroyOnClose={true}
      >
        <Table
          columns={columns}
          pagination={pagination}
          dataSource={draftMembers}
          rowSelection={{ ...rowSelection }}
          title={() => TableHeader()}
          loading={loading}
          onChange={handleTableChange}
          locale={{
            emptyText: (
              <>
                <SmileOutlined style={{ marginRight: 5 }} /> {t('Common_NoMember')}
              </>
            )
          }}
          rowKey={(record) => record.id}
        />
        <div className="actionBtnBottom">
          <Button onClick={closeDrawer}>{t('Common_Cancel')}</Button>
          <Button type="primary" onClick={assignCLick} disabled={selectedItem.length === 0}>
            {t('Common_Assign')}
          </Button>
        </div>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
