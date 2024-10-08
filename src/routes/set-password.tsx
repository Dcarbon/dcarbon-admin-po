import { setPws } from '@/adapters/auth';
import AuthLayout from '@/components/common/auth-layout';
import { validatePassword } from '@/utils/helpers';
import { useMutation } from '@tanstack/react-query';
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import { Button, Flex, Form, Input, message, notification } from 'antd';

export const Route = createFileRoute('/set-password')({
  validateSearch: (search: Record<string, unknown>): { code: string } => {
    return {
      code: search.code as string,
    };
  },
  component: () => <SetPsw />,
});
const SetPsw = () => {
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
    <AuthLayout
      title="Change password"
      description="Change your password the first time you log in"
    >
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

        <Flex justify="center">
          <Button
            className="w-full"
            type="primary"
            htmlType="submit"
            loading={handleSetPsw.isPending}
          >
            Save
          </Button>
        </Flex>
      </Form>
    </AuthLayout>
  );
};
