import ConnectButton from '@/components/common/button/connect-button';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Card, Col, Flex, Row, Typography } from 'antd';

export const Route = createLazyFileRoute('/_auth/')({
  component: Index,
});
function Index() {
  return (
    <Flex className="h-full" vertical gap={13}>
      <Row className="dashboard-row" gutter={{ sm: 8, md: 16 }}>
        <Col className="dashboard-card" xs={24} lg={8}>
          <Card>
            <Typography.Title level={4}>Over View</Typography.Title>
            <h1>Vite + React</h1>
            <div className="card">
              <ConnectButton />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={16} className="dashboard-card">
          <Card>
            <Typography.Title level={4}>Chart</Typography.Title>
          </Card>
        </Col>
      </Row>
      <Row className="dashboard-row" gutter={[16, 16]}>
        <Col xs={24} lg={8} className="dashboard-card">
          <Flex vertical gap={12}>
            <Typography.Title level={4}> Total project output</Typography.Title>
            <Card>
              <div>title</div>
              <div>value</div>
              <div>Project</div>
            </Card>
            <Card>
              <div>title</div>
              <div>value</div>
              <div>Project</div>
            </Card>
            <Card>
              <div>title</div>
              <div>value</div>
              <div>Project</div>
            </Card>
          </Flex>
        </Col>
        <Col xs={24} lg={16} className="dashboard-card">
          <Flex vertical gap={12}>
            <Typography.Title level={4}>Project List</Typography.Title>
            <Card>
              <div>Project 9</div>
            </Card>
            <Card>
              <div>Project 9</div>
            </Card>
            <Card>
              <div>Project 9</div>
            </Card>
            <Card>
              <div>Project 9</div>
            </Card>
            <Card>
              <div>Project 9</div>
            </Card>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
}
