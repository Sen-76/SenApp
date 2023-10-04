import { Button, Checkbox, Form, Input, Row } from 'antd';
import styles from './Login.module.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLoginManager } from '../../../common/helpers/login-manager';
import { useEffect, useState } from 'react';
import { cookie } from '../../../common/helpers/cookie/cookie';
import { Rule } from 'antd/es/form';

function Login() {
  const { t } = useTranslation();
  const { loginIn } = useLoginManager();
  const [form] = Form.useForm();
  const [customAlert, setCustomAlert] = useState<Authen.IUserLoginModel>();
  const { getLoginUser } = useLoginManager();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const saveUser = cookie.getCookie('userSave');
    form.setFieldsValue(JSON.parse(saveUser as string));
    getLoginUser() && (location.href = '/');
  }, []);

  const onFinish = async (values: A) => {
    setLoading(true);
    const result = await loginIn(values);
    setCustomAlert(result);
    setLoading(false);
  };

  const formRule = {
    userEmail: [
      { required: true, message: t('Common_Login_UserRequire_Alert') },
      { type: 'email', message: t('Manage_Account_Invalid_Email_Format') }
    ] as Rule[],
    password: [{ required: true, message: t('Common_Login_PasswordRequire_Alert') }]
  };

  return (
    <div className={styles.login}>
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className={styles.form}
        layout="vertical"
        form={form}
      >
        <div className={styles.loginIcon}>
          <UserOutlined />
          <label>{t('Common_Login')}</label>
        </div>
        <Form.Item
          label={t('username')}
          name="userEmail"
          rules={formRule.userEmail}
          className={customAlert?.userEmail ? 'customFieldAlert' : ''}
        >
          <Input
            size="large"
            prefix={<UserOutlined style={{ marginRight: 5 }} />}
            onChange={() => setCustomAlert({ ...customAlert, userEmail: '' })}
          />
        </Form.Item>
        <div className="customAlert">{customAlert?.userEmail && t('Common_Login_EmailNotExist_Alert')}</div>
        <Form.Item
          label={t('password')}
          name="password"
          rules={formRule.password}
          className={customAlert?.password ? 'customFieldAlert' : ''}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined style={{ marginRight: 5 }} />}
            onChange={() => setCustomAlert({ ...customAlert, password: '' })}
          />
        </Form.Item>
        <span className="customAlert">{customAlert?.password && t('Common_Login_PasswordNotCorrect_Alert')}</span>

        <Row>
          <Form.Item name="remember" valuePropName="checked">
            <div className={styles.refo}>
              <Checkbox>{t('Common_Login_RememberMe')}</Checkbox>
              <Link to="/forgot">{t('Common_Login_ForgotPassword')} ?</Link>
            </div>
          </Form.Item>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {t('Common_Login')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
