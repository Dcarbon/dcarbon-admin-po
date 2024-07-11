import { useEffect, useState } from 'react';
import { requestResetPassword, resetPassword } from '@/adapters/auth';
import AuthLayout from '@/components/common/auth-layout';
import Countdown from '@/components/common/count-down';
import { validatePassword } from '@/utils/helpers';
import { useMutation } from '@tanstack/react-query';
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import { Button, Flex, Form, Input, message, notification, Space } from 'antd';
import jwt from 'jsonwebtoken';

export const Route = createFileRoute('/reset-password')({
  validateSearch: (search: Record<string, unknown>): { code?: string } => {
    return {
      code: search.code as string,
    };
  },
  component: () => <ResetPassword />,
});
type DecodeProps =
  | {
      email: string;
      exp: number;
      expired_at: string;
    }
  | undefined
  | null;

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [timer, setTimer] = useState<string | null>(null);
  const search = useSearch({ from: '/reset-password' });
  const navigate = useNavigate();

  const decode: DecodeProps = search.code
    ? (jwt.decode(search.code as string) as DecodeProps)
    : undefined;
  useEffect(() => {
    if (
      decode?.expired_at &&
      new Date(decode?.expired_at).getTime() > new Date().getTime()
    ) {
      setTimer(decode.expired_at);
    }
  }, [decode]);

  const handleResetPsw = useMutation({
    mutationFn: requestResetPassword,
    onSuccess: (data: { email: string; next_request_at: string }) => {
      message.success('request reset password successfully');
      setTimer(data.next_request_at);
    },
    onError: (error: string) => {
      notification.error({
        message: 'Error',
        description: error,
      });
    },
  });
  const handleSetPsw = useMutation({
    mutationFn: ({ password }: { password: string }) =>
      resetPassword({ password: password, token: search.code ?? '' }),
    onSuccess: () => {
      message.success('Reset password successfully');
      navigate({
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
    <AuthLayout
      title={
        !search.code && !decode?.expired_at
          ? 'Reset password'
          : 'Change password'
      }
      description={
        !search.code && !decode?.expired_at
          ? 'We will send password reset information to your email address.'
          : ''
      }
    >
      {!search.code && !decode?.expired_at ? (
        <Form
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={(value) => handleResetPsw.mutate(value)}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Flex justify="center">
            <Button
              className="w-full"
              type="primary"
              htmlType="submit"
              disabled={timer !== null}
              loading={handleResetPsw.isPending}
            >
              {timer ? (
                <Countdown endTime={timer} setTimer={setTimer} />
              ) : (
                'Send'
              )}
            </Button>
          </Flex>
        </Form>
      ) : (
        <Form
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
            label="New password"
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
            <Input.Password type="password" allowClear />
          </Form.Item>
          <Form.Item
            name="repassword"
            label="Confirm New password"
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
            <Input.Password type="password" allowClear />
          </Form.Item>
          <Flex justify="end">
            {decode?.expired_at && timer ? (
              <Space>
                <Countdown endTime={decode.expired_at} setTimer={setTimer} />
              </Space>
            ) : (
              <Button
                type="link"
                onClick={() => navigate({ to: '/reset-password' })}
              >
                <span className="count-down-timer primary-color-600">
                  Resend?
                </span>
              </Button>
            )}
          </Flex>
          <Flex justify="center">
            <Button
              className="w-full"
              type="primary"
              htmlType="submit"
              disabled={timer === null}
              loading={handleSetPsw.isPending}
            >
              Save
            </Button>
          </Flex>
        </Form>
      )}
    </AuthLayout>
  );
};
