import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '@/utils/constants';
import {
  createFileRoute,
  redirect,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import { Button, Col, Flex, Form, Input, Spin, Typography } from 'antd';

type ProductSearch = {
  code?: string;
};
export const Route = createFileRoute('/signin')({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      code: search.code as string,
    };
  },
  beforeLoad: async ({
    search,
    context,
  }: {
    search: ProductSearch;
    context: any;
  }) => {
    const { code } = search;
    const { loginBycode } = context as any;
    if (code) {
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
      await loginBycode({ code });
      throw redirect({
        to: '/',
      });
    }
    return;
  },
  component: () => <LoginPage />,
});

const LoginPage = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const { Text, Title } = Typography;
  const search = useSearch({ from: '/signin' });
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    if (isAuthenticated) {
      navigate({
        from: '/',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  if (search.code && !isAuthenticated && isLoading) {
    return <Spin size="large" fullscreen spinning />;
  }
  return (
    <Flex className="login-container" justify="center">
      <Flex justify="center" align="center" className="navbar">
        <Flex align="center" className="navbar-box" gap={20}>
          <img
            src="/image/login/logo-black.png"
            alt="logo"
            width={175}
            height={32}
          />
          <Text className="login-item-active">Sign In</Text>
        </Flex>
      </Flex>
      <Col span={14} className="login-side-left">
        <div className="login-modal">
          <div className="login-title">
            <Title className="login-title-heading">Welcome Back</Title>
            <Text className="login-title-description">
              Enter your email and password to sign in
            </Text>
          </div>
          <Form
            name="normal_login"
            form={form}
            onFinish={login}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="username"
              label="Email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  whitespace: false,
                },
              ]}
            >
              <Input placeholder="Your email address" allowClear />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Your password"
                allowClear
              />
            </Form.Item>

            <Flex justify="center">
              <Button
                className="w-full"
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Sign In
              </Button>
            </Flex>
          </Form>
        </div>
      </Col>
      <Col span={10} className="login-side-right">
        <img
          src="/image/login/login-image.png"
          alt="login"
          width={'100%'}
          height={'85%'}
          className="login-image"
        />
        <div className="login-side-right-logo">
          <img
            src="/image/login/logo-white.png"
            alt="logo"
            width={'72%'}
            height={'10%'}
          />
        </div>
      </Col>
    </Flex>
  );
};

export default LoginPage;
