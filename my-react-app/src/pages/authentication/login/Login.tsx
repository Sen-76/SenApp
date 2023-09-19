import { Button, Checkbox, Form, Input } from 'antd';
import styles from './Login.module.scss';
import React from 'react';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function Login() {
  const onFinish = (values: A) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: A) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.login}>
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styles.form}
        layout="vertical"
      >
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

        <Form.Item<FieldType> name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

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
