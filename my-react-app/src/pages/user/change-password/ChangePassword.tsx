import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './ChangePassword.module.scss';
import { UserOutlined } from '@ant-design/icons';
import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { useEffect } from 'react';

function ChangePassword() {
  const { t } = useTranslation();
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb([{ icon: <UserOutlined />, text: `${t('management')}` }, { text: `${t('Change_Password')}` }]);
  }, [t]);
  return (
    <div className={styles.changePassword}>
      <Form layout="vertical">
        <Form.Item label={t('Old_Password')} name="oldPass">
          <Input.Password />
        </Form.Item>
        <Form.Item label={t('New_Password')} name="newPass">
          <Input.Password />
        </Form.Item>
        <Form.Item label={t('Confirm_Password')} name="reNewPass">
          <Input.Password />
        </Form.Item>
      </Form>
      <div className="actionBtnBottom">
        <Button type="primary" htmlType="submit">
          {t('Common_Confirm')}
        </Button>
      </div>
    </div>
  );
}

export default ChangePassword;
