import { CloseOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Table, Tooltip } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../Member.module.scss';
import { ColumnsType } from 'antd/es/table';
import Paragraph from 'antd/es/typography/Paragraph';
import { useTranslation } from 'react-i18next';
import Search from 'antd/es/input/Search';
import { TablePaginationConfig, TableRowSelection } from 'antd/es/table/interface';

interface IProps {
  refreshList: () => void;
}
const draftMembers = [
  {
    id: 1,
    name: 'Sen',
    job: 'Developer',
    gender: 'Male',
    photoUrl: 'https://top10tphcm.com/wp-content/uploads/2023/02/hinh-anh-meo.jpeg'
  }
];
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
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
          <Tooltip
            placement="bottom"
            title={<div className={styles.customTooltip}>{record.name}</div>}
            color="#ffffff"
            arrow={true}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size={40} src={record.photoUrl} style={{ marginRight: 10 }} />
              <Paragraph
                className={styles.paragraph}
                ellipsis={{ rows: 3, expandable: false }}
                style={{ maxWidth: 150, minWidth: 30 }}
              >
                {record.name}
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
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 50,
      render: (_, record) => {
        const kickoutCLick = () => {
          console.log('assigned');
        };

        return (
          <div>
            <Tooltip
              placement="bottom"
              title={<div className={styles.customTooltip}>{t('Common_Assign')}</div>}
              color="#ffffff"
              arrow={true}
            >
              <Button type="text" onClick={kickoutCLick} icon={<PlusOutlined />} />
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
          <Button
            type="text"
            onClick={() => console.log(selectedItem)}
            icon={<PlusOutlined />}
            disabled={selectedItem.length === 0}
          >
            {t('Common_Assign')}
          </Button>
        </div>
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
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(selected, selectedRows, record);
      setSelectedItem(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
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
          locale={{
            emptyText: (
              <>
                <SmileOutlined style={{ marginRight: 5 }} /> {t('Common_NoMember')}
              </>
            )
          }}
        />
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
