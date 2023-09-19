import { CloseOutlined, ExclamationCircleFilled, LogoutOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Form, Input, Modal, Table, Tooltip, notification } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../Teams.module.scss';
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
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 20,
    simple: false
  });
  const { confirm } = Modal;
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
          confirm({
            title: t('Common_Kick'),
            icon: <ExclamationCircleFilled />,
            content: 'Do you wanna kick this user out of this group?',
            onOk() {
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
              title={<div className={styles.customTooltip}>{t('Common_Kick')}</div>}
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

  const formRule = {
    title: [{ required: true, message: t('Common_Require_Field') }]
  };

  return (
    <>
      <Drawer
        title={t('Common_AddNew')}
        placement="right"
        open={open}
        extra={<CloseOutlined onClick={closeDrawer} />}
        onClose={closeDrawer}
        maskClosable={false}
        closable={false}
        width={520}
        destroyOnClose={true}
      >
        <Form layout="vertical">
          <Form.Item name="title" label={t('title')} rules={formRule.title}>
            <Input maxLength={250} showCount />
          </Form.Item>
          <Form.Item name="description" label={t('description')}>
            <Input.TextArea maxLength={1000} showCount />
          </Form.Item>
          <Form.Item name="member" label={t('members')}>
            <Table
              columns={columns}
              pagination={pagination}
              dataSource={draftMembers}
              locale={{
                emptyText: (
                  <>
                    <SmileOutlined style={{ marginRight: 5 }} /> {t('Common_NoMember')}
                  </>
                )
              }}
            />
          </Form.Item>
          <div className="actionBtnBottom">
            <Button onClick={closeDrawer}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
