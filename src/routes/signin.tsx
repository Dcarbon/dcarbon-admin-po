import { useEffect } from 'react';
import AuthLayout from '@/components/common/auth-layout';
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
import { Button, Flex, Form, Input, Spin } from 'antd';

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
    const { auth } = context as any;
    if (code) {
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
      await auth.loginBycode({ code });
      return redirect({
        to: '/',
        viewTransition: true,
      });
    }
    return;
  },
  component: () => <LoginPage />,
});
const LoginPage = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const search = useSearch({ from: '/signin' });
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    if (isAuthenticated) {
      navigate({
        from: '/',
        viewTransition: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  if (search.code && !isAuthenticated && isLoading) {
    return <Spin size="large" fullscreen spinning />;
  }
  return (
    <AuthLayout
      title="Welcome Back"
      description="Enter your email and password to sign in"
    >
      <Form
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
        <Flex justify="end">
          <Button
            className="primary-color-600 count-down-timer"
            type="link"
            onClick={() => {
              navigate({
                from: '/signin',
                to: '/reset-password',
              });
            }}
          >
            Reset password?
          </Button>
        </Flex>

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
    </AuthLayout>
  );
};

export default LoginPage;
