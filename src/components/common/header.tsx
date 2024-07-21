import { memo } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Flex, Layout, Typography } from 'antd';

import logo from '/image/dcarbon-logo-black.svg';

const Header = memo(() => {
  const { Header } = Layout;
  const { isAuthenticated, user } = useAuth();

  return (
    <Layout>
      <Header className="header-container">
        <Flex justify="center" align="center" gap={7}>
          <img src={logo} alt="logo" width={25} height={25} />
          <Typography.Title className="header-title" level={5}>
            DCARBON
          </Typography.Title>
        </Flex>
        <>
          {isAuthenticated && user ? (
            <Flex align={'center'} gap={5}>
              <Avatar size={'default'} icon={<UserOutlined />} />
              <Flex vertical style={{ lineHeight: '15px' }}>
                <span style={{ fontWeight: '500', fontSize: '.8em' }}>
                  {user.profile_name}
                </span>
                <span style={{ fontSize: '.55em', color: 'gray' }}>
                  {user.role?.toUpperCase()}
                </span>
              </Flex>
            </Flex>
          ) : (
            ''
          )}
        </>
      </Header>
    </Layout>
  );
});

export default Header;
