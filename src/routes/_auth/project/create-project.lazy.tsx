import UploadMultiImage from '@/components/common/upload';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Button, Col, Flex, Form, Input, Typography } from 'antd';

export const Route = createLazyFileRoute('/_auth/project/create-project')({
  component: () => <CreateProject />,
});

const CreateProject = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  return (
    <div>
      <Typography.Title
        className="navigate-back"
        level={3}
        onClick={() =>
          navigate({
            to: '/project',
          })
        }
      >
        <ArrowLeftOutlined /> Back
      </Typography.Title>
      <Form form={form} layout="vertical">
        <Flex>
          <Col span={12}>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
            <Form.Item label="Account PO" name="accountPO">
              <Form.Item
                label="email"
                name="accountPO"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={12}>
            Images
            <UploadMultiImage />
          </Col>
        </Flex>
        <Flex justify="end" gap={10}>
          <Button type="primary">Submit</Button>
          <Button danger htmlType="reset">
            Cancel
          </Button>
        </Flex>
      </Form>
    </div>
  );
};
