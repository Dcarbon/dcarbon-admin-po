import { memo } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { UserOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import { Avatar, Flex, Layout, Space, Typography } from 'antd';

import logo from '/image/dcarbon-logo-black.svg';

const Header = memo(() => {
  const { Header } = Layout;
  const { isAuthenticated, user } = useAuth();
  return (
    <Layout>
      <Header className="header-container">
        <Space>
          <Link to={'/'}>
            <Flex justify="center" align="center" gap={7}>
              <img src={logo} alt="logo" width={25} height={25} />
              <Typography.Title className="header-title" level={5}>
                DCARBON
              </Typography.Title>
            </Flex>
          </Link>
        </Space>
        <>
          {isAuthenticated && user ? (
            <Flex align={'center'} gap={5}>
              <Avatar
                style={{
                  backgroundColor: 'var(--main-color)',
                  marginRight: '5px',
                }}
                size={'default'}
                icon={<UserOutlined />}
              />
              <Flex vertical className="header-user">
                <span className="header-user-name">{user.profile_name}</span>
                <span className="header-user-role">
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
