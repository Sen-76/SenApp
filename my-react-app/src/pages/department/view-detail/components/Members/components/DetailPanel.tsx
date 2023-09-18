import { CloseOutlined } from '@ant-design/icons';
import { Col, Drawer, Row } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../Member.module.scss';

interface IProps {
  refreshList: () => void;
}
function DetailPanel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<A>({});

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
          <Col span={12}>Email</Col>
          <Col span={12}>{data.email}</Col>
        </Row>
      </Drawer>
    </>
  );
}

export default forwardRef(DetailPanel);
