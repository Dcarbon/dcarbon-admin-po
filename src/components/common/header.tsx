import ConnectButton from '@/components/common/button/connect-button';
import { useAuth } from '@/contexts/auth-context';
import { Button, Flex, Layout, Typography } from 'antd';

const Header = () => {
  const { Header } = Layout;
  const { logout } = useAuth();
  return (
    <Layout>
      <Header className="header-container">
        <Flex justify="center" align="center" gap={10}>
          <img src="/dcarbon-logo.png" alt="logo" width={40} height={40} />
          <Typography.Title className="header-title" level={3}>
            DCARBON
          </Typography.Title>
        </Flex>
        <Flex gap={10}>
          <ConnectButton />
          <Button type="primary" onClick={logout}>
            Sign out
          </Button>
        </Flex>
      </Header>
    </Layout>
  );
};

export default Header;
