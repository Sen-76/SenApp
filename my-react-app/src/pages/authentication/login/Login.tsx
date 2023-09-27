import { Button, Checkbox, Form, Input, Row } from 'antd';
import styles from './Login.module.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLoginManager } from '../../../common/helpers/login-manager';
import { useEffect } from 'react';
import { cookie } from '../../../common/helpers/cookie/cookie';

function Login() {
  const { t } = useTranslation();
  const { loginIn } = useLoginManager();
  const [form] = Form.useForm();

  useEffect(() => {
    const saveUser = cookie.getCookie('userSave');
    console.log(saveUser);
    form.setFieldsValue(JSON.parse(saveUser as string));
  }, []);

  const onFinish = (values: A) => {
    console.log('Success:', values);
    loginIn(values);
  };

  const formRule = {
    username: [{ required: true, message: t('Common_Login_UserRequire_Alert') }],
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
        <Form.Item label={t('username')} name="username" rules={formRule.username}>
          <Input size="large" prefix={<UserOutlined style={{ marginRight: 5 }} />} />
        </Form.Item>

        <Form.Item label={t('password')} name="password" rules={formRule.password}>
          <Input.Password size="large" prefix={<LockOutlined style={{ marginRight: 5 }} />} />
        </Form.Item>

        <Row>
          <Form.Item name="remember" valuePropName="checked">
            <div className={styles.refo}>
              <Checkbox>{t('Common_Login_RememberMe')}</Checkbox>
              <Link to="/forgot">{t('Common_Login_ForgotPassword')} ?</Link>
            </div>
          </Form.Item>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t('Common_Login')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
