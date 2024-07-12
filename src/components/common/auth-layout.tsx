import React from 'react';
import { Col, Flex, Typography } from 'antd';

import bgImage from '/image/login/login-image.png';
import logoBlack from '/image/login/logo-black.png';
import logoWhite from '/image/login/logo-white.png';

const AuthLayout = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  const { Title, Text } = Typography;
  return (
    <Flex className="auth-container" justify="center">
      <Flex justify="center" align="center" className="navbar">
        <Flex align="center" className="navbar-box" gap={20}>
          <img src={logoBlack} alt="logo" width={175} height={32} />
        </Flex>
      </Flex>
      <Col xs={24} lg={14} className="auth-side-left">
        <div className="auth-modal">
          <div className="auth-title">
            <Title className="auth-title-heading">{title}</Title>
            <Text className="auth-title-description">{description}</Text>
          </div>
          {children}
        </div>
      </Col>
      <Col lg={10} xs={0} className="auth-side-right">
        <img
          src={bgImage}
          alt="auth"
          width={'100%'}
          height={'85%'}
          className="auth-image"
        />
        <div className="auth-side-right-logo">
          <img src={logoWhite} alt="logo" width={'72%'} height={'10%'} />
        </div>
      </Col>
    </Flex>
  );
};

export default AuthLayout;
