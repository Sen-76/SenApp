import { CloseOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

interface IProps {
  refreshList: () => void;
}
function DetailPanel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);

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
        Detail Panel
      </Drawer>
    </>
  );
}

export default forwardRef(DetailPanel);
