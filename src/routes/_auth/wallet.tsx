import { getWallet, getWalletTransactions } from '@/adapters/wallet';
import LineChart from '@/components/features/wallet/line-chart';
import TransactionTable from '@/components/features/wallet/table';
import { QUERY_KEYS } from '@/utils/constants';
import { formatByEnUsNum } from '@/utils/helpers';
import { EyeOutlined } from '@ant-design/icons';
import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import { Card, Col, Row, Space, Typography } from 'antd';

import logo from '/image/dcarbon-logo-black.svg';

export const Route = createFileRoute('/_auth/wallet')({
  validateSearch: (search: Record<string, unknown>): { page: number } => ({
    page: (search.page as number) || 1,
  }),
  component: () => <Wallet />,
});
const Wallet = () => {
  const search = useSearch({ from: '/_auth/wallet' });
  const [{ data: chartData }, { data: tableData }] = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEYS.GET_WALLET],
        queryFn: getWallet,
      },
      {
        queryKey: [QUERY_KEYS.GET_WALLET_TRANSACTIONS, search],
        queryFn: () => getWalletTransactions(search as { page: number }),
        placeholderData: keepPreviousData,
        enabled: !!search.page || true,
      },
    ],
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
              Wallet Balance <EyeOutlined />
            </Space>
          </Typography.Title>
          <Card className="wallet-balance">
            <span className="neutral-color-700">Crypto</span>
            <Typography.Title level={2}>
              ≈ {formatByEnUsNum(chartData?.carbon || 0)} DB CARBON
            </Typography.Title>
            <span className="neutral-color-700">
              ≈ {formatByEnUsNum(chartData?.exchange_rate || 0)}{' '}
              {chartData?.exchange_rate_currency || 'VND'}
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
          <Typography.Title level={4}>Transaction history</Typography.Title>
          <TransactionTable data={tableData as TransactionPages} />
        </Card>
      </Col>
    </Row>
  );
};
