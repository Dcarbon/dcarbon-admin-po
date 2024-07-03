import { setPws } from '@/adapters/auth';
import { validatePassword } from '@/utils/helpers';
import { useMutation } from '@tanstack/react-query';
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  message,
  notification,
  Typography,
} from 'antd';

export const Route = createFileRoute('/set-password')({
  validateSearch: (search: Record<string, unknown>): { code: string } => {
    return {
      code: search.code as string,
    };
  },
  component: () => <SetPsw />,
});
const SetPsw = () => {
  const { Text, Title } = Typography;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const search = useSearch({ from: '/set-password' });
  const handleSetPsw = useMutation({
    mutationFn: ({ password }: { password: string }) =>
      setPws({ password: password, token: search.code }),
    onSuccess: () => {
      message.success('Password updated successfully');
      navigate({
        from: '/set-password',
        to: '/signin',
      });
    },
    onError: (error: string) => {
      notification.error({
        message: 'Error',
        description: error,
      });
    },
  });

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
          <Text className="login-item-active">Set Password</Text>
        </Flex>
      </Flex>
      <Col span={14} className="login-side-left">
        <div className="login-modal">
          <div className="login-title">
            <Title className="login-title-heading">Set Password</Title>
            <Text className="login-title-description">
              Enter password to set your password
            </Text>
          </div>
          <Form
            name="normal_login"
            form={form}
            initialValues={{
              remember: true,
            }}
            onFinish={(value) => handleSetPsw.mutate(value)}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  whitespace: false,
                  validator(_, value) {
                    if (!validatePassword(value)) {
                      return Promise.reject(
                        new Error(
                          'Password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.',
                        ),
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Password"
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="repassword"
              label="Re-password"
              rules={[
                {
                  required: true,
                  validator(_, value) {
                    if (value !== form.getFieldValue('password')) {
                      return Promise.reject(
                        new Error(
                          'The two passwords that you entered do not match!',
                        ),
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              dependencies={['password']}
            >
              <Input.Password
                type="password"
                placeholder="Re-password"
                allowClear
              />
            </Form.Item>

            <Flex justify="center">
              <Button
                className="w-full"
                type="primary"
                htmlType="submit"
                loading={handleSetPsw.isPending}
              >
                Set Password
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
