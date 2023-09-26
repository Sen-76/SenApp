import { CloseOutlined, SmileOutlined } from '@ant-design/icons';
import { Avatar, Col, Drawer, Row, Table, Tooltip } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../Teams.module.scss';
import { ColumnsType } from 'antd/es/table';
import Paragraph from 'antd/es/typography/Paragraph';
import { useTranslation } from 'react-i18next';

interface IProps {
  refreshList: () => void;
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
      >
        <Row>
          <Col span={12}>Name</Col>
          <Col span={12}>{data.name}</Col>
        </Row>
        <Row>
          <Col span={12}>job</Col>
          <Col span={12}>{data.job}</Col>
        </Row>
        <Row>
          <Col span={12}>Member</Col>
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
        />
      </Drawer>
    </>
  );
}

export default forwardRef(DetailPanel);
