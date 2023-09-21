import { Button, Checkbox, Form, Input, Row } from 'antd';
import styles from './Login.module.scss';
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function Login() {
  const { t } = useTranslation();

  const onFinish = (values: A) => {
    console.log('Success:', values);
  };

  return (
    <div className={styles.login}>
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className={styles.form}
        layout="vertical"
      >
        <div className={styles.loginIcon}>
          <UserOutlined />
          <label>{t('Common_Login')}</label>
        </div>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input size="large" prefix={<UserOutlined style={{ marginRight: 5 }} />} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined style={{ marginRight: 5 }} />} />
        </Form.Item>

        <Row>
          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <div className={styles.refo}>
              <Checkbox>{t('Common_Login_RememberMe')}</Checkbox>
              <Link to="/forgot">{t('Common_Login_ForgotPassword')}</Link>
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
