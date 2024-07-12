import ConnectButton from '@/components/common/button/connect-button';
import { MENU } from '@/utils/constants';
import { getInfoDevice } from '@/utils/helpers';
import { useLocation } from '@tanstack/react-router';
import { Flex, Layout, Space, Typography } from 'antd';

import logo from '/image/dcarbon-logo-black.svg';

const Header = () => {
  const { Header } = Layout;
  const location = useLocation();
  const capitalizeFirstLetter = (string: string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <Layout>
      <Header className="header-container">
        <Space
          size={getInfoDevice().device === 'DESKTOP' ? 120 : 60}
          align="center"
        >
          <Flex justify="center" align="center" gap={7}>
            <img src={logo} alt="logo" width={25} height={25} />
            <Typography.Title className="header-title" level={5}>
              DCARBON
            </Typography.Title>
          </Flex>
          <Flex>
            <Typography.Text className="breadcrumb">
              {capitalizeFirstLetter(
                (location.pathname.split('/')[1] || MENU[0].label).replace(
                  '-',
                  ' ',
                ),
              )}
            </Typography.Text>
          </Flex>
        </Space>
        {getInfoDevice().device === 'DESKTOP' ? (
          <Flex gap={10}>
            <ConnectButton />
          </Flex>
        ) : null}
      </Header>
    </Layout>
  );
};

export default Header;
