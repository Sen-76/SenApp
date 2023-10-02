import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './StarConfiguration.module.scss';
import { useLoading } from '@/common/context/useLoading';
import { service } from '@/services/apis';

function StarConfiguration() {
  const { t } = useTranslation();
  const { setBreadcrumb } = useBreadcrumb();
  const { showLoading, closeLoading } = useLoading();
  const [form] = Form.useForm();

  useEffect(() => {
    setBreadcrumb([
      { icon: <SettingOutlined />, text: `${t('configuration')}` },
      { text: `${t('Configuration_File')}` }
    ]);
  }, [t]);

  useEffect(() => {
    getStar();
  }, []);

  const getStar = async () => {
    try {
      showLoading();
      const result = await service.globalSettingsService.getByType(3);
      form.setFieldsValue(result);
      closeLoading();
    } catch (e) {
      console.log(e);
    }
  };

  const setStar = async () => {
    try {
      showLoading();
      const result = await service.globalSettingsService.updateStar(form.getFieldsValue());
      result.statusCode === 200 &&
        notification.open({
          message: t('Common_UpdateSuccess'),
          type: 'success'
        });
      form.setFieldsValue(result);
      closeLoading();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.starConfig}>
      <Form layout="vertical" className={styles.form} form={form}>
        <Form.Item>{t('Configuration_Star_Description')}</Form.Item>
        <Form.Item
          label={t('Configuration_Star_TotalStar')}
          name="numberOfStars"
          rules={[{ required: true, message: t('Common_Require_Field') }]}
          style={{ width: '50%', minWidth: 300 }}
        >
          <InputNumber min={0}></InputNumber>
        </Form.Item>
      </Form>
      <div className="actionBtnBottom">
        <Button type="primary" htmlType="submit" onClick={setStar}>
          {t('Common_Confirm')}
        </Button>
      </div>
    </div>
  );
}

export default StarConfiguration;