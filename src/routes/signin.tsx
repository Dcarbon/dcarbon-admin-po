import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button, Flex, Form, Input, Typography } from 'antd';

export const Route = createFileRoute('/signin')({
  component: () => <LoginPage />,
});

const LoginPage = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const { Text, Title } = Typography;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({
        from: '/',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return (
    <section className="login-container">
      <div className="login-modal">
        <div className="login-title">
          <Title>Sign in</Title>
          <Text>Welcome back! Please enter your details below to sign in.</Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={login}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="username"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Flex justify="center">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Sign in
            </Button>
          </Flex>
        </Form>
      </div>
    </section>
  );
};

export default LoginPage;
