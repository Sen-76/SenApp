import { ExclamationCircleFilled, LogoutOutlined, SmileOutlined, SolutionOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, Table, TablePaginationConfig, Tooltip, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import styles from '../Teams.module.scss';
import { useTranslation } from 'react-i18next';
import Paragraph from 'antd/es/typography/Paragraph';

interface IProps {
  data: A[];
  openPanel: (data?: A) => void;
}
function DataTable(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
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
          <Paragraph
            className={styles.paragraph}
            ellipsis={{ rows: 3, expandable: false }}
            style={{ maxWidth: 150, minWidth: 30 }}
          >
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
          <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Avatar key={i} src={record.photoUrl} />
            ))}
          </Avatar.Group>
        );
      }
    },
    {
      title: t('description'),
      dataIndex: 'job',
      key: 'job',
      render: (_, record) => {
        return record.description;
      }
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 130,
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
            <Tooltip
              placement="bottom"
              title={<div className={styles.customTooltip}>{t('view detail')}</div>}
              color="#ffffff"
              arrow={true}
            >
              <Button type="text" onClick={viewDetailCLick} icon={<SolutionOutlined />} />
            </Tooltip>
            <Tooltip
              placement="bottom"
              title={<div className={styles.customTooltip}>{t('kick')}</div>}
              color="#ffffff"
              arrow={true}
            >
              <Button type="text" onClick={kickoutCLick} icon={<LogoutOutlined />} />
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
