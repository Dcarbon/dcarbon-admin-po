import { useState } from 'react';
import { getWallet } from '@/adapters/wallet';
import LineChart from '@/components/features/wallet/line-chart';
import WalletTabs from '@/components/features/wallet/tabs';
import { QUERY_KEYS } from '@/utils/constants';
import { formatByEnUsNum } from '@/utils/helpers';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Card, Col, Row, Space, Typography } from 'antd';

import logo from '/image/dcarbon-logo-black.svg';

export const Route = createFileRoute('/_auth/wallet')({
  validateSearch: (
    search: Record<string, unknown>,
  ): { page: number; tab: number } => ({
    tab: [1, 2].includes(search.tab as number) ? (search.tab as number) : 1,
    page: (search.page as number) || 1,
  }),
  component: () => <Wallet />,
});
const Wallet = () => {
  const [isHidden, setisHidden] = useState(true);
  const { data: chartData } = useQuery({
    queryKey: [QUERY_KEYS.GET_WALLET],
    queryFn: getWallet,
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xl={8}>
        <Card className="wallet-container">
          <Typography.Title level={4}>My Wallet</Typography.Title>
          <span className="wallet-growth-dcarbon">
            {formatByEnUsNum(chartData?.dcarbon || 0)} DCarbon
          </span>
          {chartData ? (
            <LineChart data={chartData?.carbon_chart.data || []} />
          ) : null}
          <Typography.Title level={4}>
            <Space size={6}>
              Wallet Balance{' '}
              <span onClick={() => setisHidden(!isHidden)}>
                {isHidden ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </span>
            </Space>
          </Typography.Title>
          <Card className="wallet-balance">
            <span className="neutral-color-700">Crypto</span>
            <Typography.Title level={2}>
              {isHidden ? (
                <Space>********</Space>
              ) : (
                <span>≈ {formatByEnUsNum(chartData?.carbon || 0)} CARBON</span>
              )}
            </Typography.Title>
            <span className="neutral-color-700">
              {isHidden ? (
                <Space>**********</Space>
              ) : (
                <span>
                  ≈ {formatByEnUsNum(chartData?.exchange_rate || 0)}{' '}
                  {chartData?.exchange_rate_currency || 'VND'}
                </span>
              )}
            </span>
            <img
              className="wallet-image"
              width={37}
              height={37}
              src={logo}
              alt="arrow-up"
            />
          </Card>
        </Card>
      </Col>
      <Col xl={16}>
        <Card className="transaction-container">
          <WalletTabs />
        </Card>
      </Col>
    </Row>
  );
};
