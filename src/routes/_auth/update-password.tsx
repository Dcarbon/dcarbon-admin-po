import { updatePassword } from '@/adapters/auth';
import { validatePassword } from '@/utils/helpers';
import useModalAction from '@/utils/helpers/back-action.tsx';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Flex, Form, message, notification } from 'antd';
import CancelButtonAction from '@components/common/button/button-cancel.tsx';
import SubmitButtonAction from '@components/common/button/button-submit.tsx';
import MyInputPassword from '@components/common/input/my-input-password.tsx';
import CenterContentLayout from '@components/common/layout/center-content/center-content.layout.tsx';

export const Route = createFileRoute('/_auth/update-password')({
  component: () => <UpdatePassword />,
});
const UpdatePassword = () => {
  const [form] = Form.useForm();
  const goBack = useModalAction({
    type: 'back',
    danger: true,
  });
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
    <div className={'main-gray-div'}>
      <CenterContentLayout className="update-pws-form" contentWidth="100%">
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
            <MyInputPassword type="password" allowClear />
          </Form.Item>
          <Form.Item className="update-new-pws">
            <Form.Item
              name="new_password"
              label="New password"
              className="update-pws-field"
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
              <MyInputPassword type="password" allowClear />
            </Form.Item>
            <Form.Item
              name="repassword"
              className="update-pws-field"
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
              <MyInputPassword type="password" allowClear />
            </Form.Item>
          </Form.Item>
          <Flex gap={10} justify="center">
            <SubmitButtonAction loading={updatePsw.isPending}>
              Save
            </SubmitButtonAction>
            <CancelButtonAction
              disabled={updatePsw.isPending}
              onClick={() => goBack({ dataForm: form.getFieldsValue() })}
            >
              Cancel
            </CancelButtonAction>
          </Flex>
        </Form>
      </CenterContentLayout>
    </div>
  );
};
