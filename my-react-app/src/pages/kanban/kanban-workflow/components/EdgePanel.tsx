import { CloseOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

interface IProps {
  save: () => void;
}
function EdgePanel(props: IProps, ref: React.ForwardedRef<A>) {
  const [open, setOpen] = useState<boolean>(false);
  useImperativeHandle(ref, () => ({
    openDrawer
  }));
  const closeDrawer = () => {
    setOpen(false);
  };
  const openDrawer = (data: A) => {
    setOpen(true);
  };
  return (
    <>
      <Drawer
        title="Add transition"
        width={500}
        closable={false}
        onClose={closeDrawer}
        maskClosable={false}
        open={open}
        extra={<CloseOutlined onClick={closeDrawer} />}
      >
        hehe
      </Drawer>
    </>
  );
}

export default forwardRef(EdgePanel);
