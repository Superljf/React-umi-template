import React, { useState } from 'react';
import styles from './index.less';
import logo from '@/assets/imgs/logo.png';
import userPng from '@/assets/imgs/user.png';
import pasPng from '@/assets/imgs/pas.png';
import { Button, Input, Form } from 'antd';
import { useModel, history } from 'umi';
import { validAuth } from '@/services/common';

const Login = () => {
  const [form] = Form.useForm(); // 使用 Form 的 useForm hook
  const { save } = useModel('commonModel');
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await validAuth({
        ...values,
      });
      save({
        username: res?.username,
      });
      history.push('/workPlace');
      // 执行登录逻辑
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <div>
        <img className={styles.logo} src={logo} alt="Logo" />
      </div>
      <div className={styles.title}>中科院物理所</div>
      <div className={styles.login_div}>
        <div className={styles.login_text}>用户登录</div>
        <Form
          form={form}
          initialValues={{
            username: '',
            password: '',
          }}
          onFinish={onFinish}
        >
          {' '}
          {/* 使用 Form 包裹整个登录组件 */}
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input
              prefix={<img src={userPng} style={{ width: 16, marginRight: 4 }} />}
              className={styles.input_css}
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password
              prefix={<img src={pasPng} style={{ width: 16, marginRight: 4 }} />}
              className={styles.input_css}
              style={{
                marginTop: 20,
              }}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" className={styles.login}>
              登录
            </Button>{' '}
            {/* 使用 Form.Item 来包裹登录按钮 */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
