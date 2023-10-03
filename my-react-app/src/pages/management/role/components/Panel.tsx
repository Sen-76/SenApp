import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, Steps } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../Role.module.scss';
import TextArea from 'antd/es/input/TextArea';

interface IProps {
  refreshList: () => void;
}
function Panel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const { t } = useTranslation();
  const [generalForm] = Form.useForm();
  const [permissionForm] = Form.useForm();
  const [editData, setEditData] = useState<A>();

  useImperativeHandle(ref, () => ({
    openDrawer
  }));

  const openDrawer = (data?: A) => {
    setOpen(true);
    setIsEdit(false);
    if (data) {
      setIsEdit(true);
    }
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const onConfirm = async () => {
    const generalCheck = await generalForm.validateFields();
    setEditData({ ...editData, ...generalForm.getFieldsValue() });
    generalCheck && setStep(1);
    const permissionCheck = await permissionForm.validateFields();
    if (step == 1 && generalCheck && permissionCheck) {
      console.log('ọk');
    }
  };

  const onStepChange = async (value: number) => {
    try {
      const generalCheck = await generalForm.validateFields();
      generalCheck && setStep(value);
    } catch {
      console.log('');
    }
  };

  const formRule = {
    title: [{ required: true, message: t('Common_Require_Field') }]
  };

  return (
    <>
      <Drawer
        title={isEdit ? `${t('Manage_Role_Edit')}` : `${t('Manage_Role_Add')}`}
        placement="right"
        open={open}
        extra={<CloseOutlined onClick={closeDrawer} />}
        onClose={closeDrawer}
        maskClosable={false}
        closable={false}
        width={720}
        destroyOnClose={true}
      >
        <Steps
          style={{ width: '70%', margin: 'auto', marginBottom: 20 }}
          onChange={onStepChange}
          current={step}
          items={[{ title: t('Manage_Role_Info') }, { title: t('Manage_Role_Permission') }]}
        />
        {step === 0 && (
          <>
            <Form form={generalForm} layout="vertical" className={styles.panelform}>
              <Form.Item name="title" label={t('Common_Title')} rules={formRule.title}>
                <Input maxLength={250} showCount />
              </Form.Item>
              <Form.Item name="description" label={t('Common_Description')}>
                <TextArea maxLength={1000} showCount />
              </Form.Item>
            </Form>
          </>
        )}
        {step === 1 && (
          <>
            <Form form={permissionForm} layout="vertical" className={styles.panelform}>
              cc
            </Form>
          </>
        )}
        <div className="actionBtnBottom">
          <Button onClick={closeDrawer}>{t('Common_Cancel')}</Button>
          <Button type="primary" onClick={onConfirm}>
            {step === 1 ? t('Common_Confirm') : t('Common_Next')}
          </Button>
        </div>
      </Drawer>
    </>
  );
}

export default forwardRef(Panel);
