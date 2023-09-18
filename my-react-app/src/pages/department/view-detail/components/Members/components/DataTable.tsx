import { EditOutlined, ExclamationCircleFilled, LogoutOutlined, SmileOutlined, SolutionOutlined } from '@ant-design/icons';
import { Button, Modal, Table, TablePaginationConfig, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import styles from '../Member.module.scss';

interface IProps {
  data: A[];
  openPanel: (data?: A) => void;
}
function DataTable(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { confirm } = Modal;
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 20,
    simple: false
  });

  const columns: ColumnsType<A> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return record.name;
      }
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (_, record) => {
        return record.gender;
      }
    },
    {
      title: 'Job Title',
      dataIndex: 'job',
      key: 'job',
      render: (_, record) => {
        return record.job;
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      //   fixed: 'right',
      width: 200,
      render: (_, record) => {
        const viewDetailCLick = () => {
          props.openPanel(record);
        };

        const kickoutCLick = () => {
          confirm({
            title: 'Kick User',
            icon: <ExclamationCircleFilled />,
            content: 'Do you wanna kick this user out of this deparment?',
            onOk() {
              tableLoading();
              notification.open({
                message: 'Delete thử thôi chứ k xóa đc đâu :")',
                type: 'success'
              });
            },
            onCancel() {
              console.log('Cancel');
            }
          });
        };

        return (
          <div>
            <Button type="text" onClick={viewDetailCLick} icon={<SolutionOutlined />} />
            <Button type="text" onClick={kickoutCLick} icon={<LogoutOutlined />} />
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

  return (
    <div className={styles.members}>
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
    </div>
  );
}

export default DataTable;
