import React from 'react';
import Header from '@/components/common/header';
import GlobalLoading from '@/components/common/loading/global-loading';
import NavBar from '@/components/common/side-bar';
import { Button, Flex, Layout } from 'antd';

import helper from '/image/helper.svg';

const { Content, Sider } = Layout;

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Header />
      <Layout className="site-layout">
        <Sider width={250} breakpoint="xl" defaultCollapsed collapsedWidth="0">
          <Flex className="sidebar-container" vertical justify="space-between">
            <NavBar />
            <Flex vertical className="sidebar-helper" justify="space-between">
              <Flex vertical gap={10}>
                <span className="helper-img">
                  <img src={helper} alt="helper" width={15} height={15} />
                </span>
                <p className="helper-title">Need help?</p>
                <p className="helper-description">Please check our docs</p>
              </Flex>
              <Flex justify="center">
                <Button className="helper-btn">Document docs</Button>
              </Flex>
            </Flex>
          </Flex>
        </Sider>
        <Layout>
          <Layout>
            <Content className="site-layout-background">
              <GlobalLoading />
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
