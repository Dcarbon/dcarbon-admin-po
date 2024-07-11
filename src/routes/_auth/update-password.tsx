import { updatePassword } from '@/adapters/auth';
import { validatePassword } from '@/utils/helpers';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  Button,
  Flex,
  Form,
  Input,
  message,
  notification,
  Typography,
} from 'antd';

export const Route = createFileRoute('/_auth/update-password')({
  component: () => <UpdatePassword />,
});
const UpdatePassword = () => {
  const [form] = Form.useForm();
  const updatePsw = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      message.success('Password updated successfully');
      form.resetFields();
    },
    onError: (error: string) => {
      notification.error({
        message: 'Error',
        description: error,
      });
    },
  });
  return (
    <div className="update-password-modal">
      <div className="auth-title update-password-mr">
        <Typography.Title level={2}>Change Password</Typography.Title>
        <Typography.Text className="auth-title-description ">
          Change your password
        </Typography.Text>
      </div>
      <Form
        form={form}
        onFinish={(value) => updatePsw.mutate(value)}
        layout="vertical"
      >
        <Form.Item
          label="Current Password"
          name="current_password"
          rules={[
            {
              required: true,
              whitespace: false,
            },
          ]}
        >
          <Input.Password type="password" allowClear />
        </Form.Item>
        <Form.Item
          name="new_password"
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
          label="Confirm new password"
          rules={[
            {
              required: true,
              validator(_, value) {
                if (value !== form.getFieldValue('new_password')) {
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
          dependencies={['new_password']}
        >
          <Input.Password type="password" allowClear />
        </Form.Item>

        <Flex justify="center">
          <Button
            className="w-full"
            type="primary"
            htmlType="submit"
            loading={updatePsw.isPending}
          >
            Save
          </Button>
        </Flex>
      </Form>
    </div>
  );
};
