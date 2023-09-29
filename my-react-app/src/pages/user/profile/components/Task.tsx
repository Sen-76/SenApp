import { Row, Table, Tag } from 'antd';
import styles from '../Profile.module.scss';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

interface IProps {
  task: A[];
}
function Task(props: IProps) {
  const { task } = props;
  const { t } = useTranslation();
  const columns: ColumnsType<A> = [
    {
      title: 'Task name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return record.title;
      }
    },
    {
      title: 'Assigned time',
      dataIndex: 'assignedTime',
      key: 'assignedTime',
      render: (_, record) => {
        return dayjs(record.assignedTime).format('DD MMM YYYY');
      }
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (_, record) => {
        return dayjs(record.deadline).format('DD MMM YYYY');
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        return <Tag color="purple">{record.status}</Tag>;
      }
    }
  ];
  return (
    <>
      <Row className={styles.header}>
        <span>{t('tasks')}</span>
        <Link to="./">{t('Common_ViewAll')}</Link>
      </Row>
      <div className={styles.body}>
        <Table columns={columns} dataSource={task} rowKey={(record) => record.id} scroll={{ x: 430 }} />
      </div>
    </>
  );
}

export default Task;
