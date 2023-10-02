import { CloseOutlined, SmileOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Drawer, Form, Row, Table, Tooltip } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../Teams.module.scss';
import { ColumnsType } from 'antd/es/table';
import Paragraph from 'antd/es/typography/Paragraph';
import { useTranslation } from 'react-i18next';
import { util } from '@/common/helpers/util';

interface IProps {
  refreshList: () => void;
  openPanel: (team: A) => void;
}
function DetailPanel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<A>({});
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    openDrawer
  }));

  const openDrawer = (data?: A) => {
    setOpen(true);
    console.log(data);
    setData(data);
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
    }
  ];

  return (
    <>
      <Drawer
        title="User Details"
        placement="right"
        open={open}
        extra={<CloseOutlined onClick={closeDrawer} />}
        onClose={closeDrawer}
        maskClosable={false}
        closable={false}
        width={520}
        destroyOnClose={true}
        className={styles.detailPanel}
      >
        <Form>
          <Row className={styles.detailRow}>
            <Col className={styles.keyCol}>{t('name')}</Col>
            <Col className={styles.valueCol}>cc</Col>
          </Row>
          <Row className={styles.detailRow}>
            <Col className={styles.keyCol}>{t('members')}</Col>
            <Col className={styles.valueCol}>cc</Col>
          </Row>
          <Row className={styles.detailRow}>
            <Col className={styles.keyCol}>{t('Common_Description')}</Col>
            <Col className={styles.valueCol}>cc</Col>
          </Row>
          <Row className={styles.detailRow}>
            <Col>{t('members')}</Col>
          </Row>
          <Table
            columns={columns}
            dataSource={data.members}
            pagination={false}
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
            <Button
              type="primary"
              onClick={() => {
                props.openPanel({});
                setOpen(false);
              }}
            >
              Update
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
}

export default forwardRef(DetailPanel);