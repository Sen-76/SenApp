import { Button, Checkbox, Form, Input, Row } from 'antd';
import styles from './Login.module.scss';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function Login() {
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
          <label>Login</label>
        </div>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Row>
          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <div className={styles.refo}>
              <Checkbox>Remember me</Checkbox>
              <Link to="/forgot">Forgot password?</Link>
            </div>
          </Form.Item>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
