import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './ChangePassword.module.scss';
import { UserOutlined } from '@ant-design/icons';
import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { useEffect, useState } from 'react';

function ChangePassword() {
  const { t } = useTranslation();
  const { setBreadcrumb } = useBreadcrumb();
  const [isValid, setIsValid] = useState<boolean>(false);

  function validatePassword(password: string): boolean {
    // Use regular expressions to check for at least one uppercase and one lowercase letter
    return /[A-Z]/.test(password) && /[a-z]/.test(password);
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setIsValid(validatePassword(newPassword));
  };

  useEffect(() => {
    setBreadcrumb([{ icon: <UserOutlined />, text: `${t('management')}` }, { text: `${t('Change_Password')}` }]);
  }, [t]);

  return (
    <div className={styles.changePassword}>
      <Row>
        <Col span={12}>
          <Form layout="vertical">
            <Form.Item label={t('Old_Password')} name="oldPass">
              <Input.Password />
            </Form.Item>
            <Form.Item label={t('New_Password')} name="newPass">
              <Input.Password onChange={handlePasswordChange} />
            </Form.Item>
            <Form.Item label={t('Confirm_Password')} name="reNewPass">
              <Input.Password />
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Checkbox.Group style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Checkbox>{t('At_Least_8_Character')}</Checkbox>
            <Checkbox>{t('At_Least_1_Digit')}</Checkbox>
            <Checkbox>{t('At_Least_1_Special_Character')}</Checkbox>
            <Checkbox>{t('At_Least_1_Lowercase_Character')}</Checkbox>
            <Checkbox>{t('At_Least_1_Uppercase_Character')}</Checkbox>
          </Checkbox.Group>
        </Col>
      </Row>
      <div className="actionBtnBottom">
        <Button type="primary" htmlType="submit">
          {t('Common_Confirm')}
        </Button>
      </div>
    </div>
  );
}

export default ChangePassword;
