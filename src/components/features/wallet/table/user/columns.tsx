import { formatByEnUsNum, truncateText } from '@/utils/helpers';
import { Button, Flex, Space, TableColumnsType, Tooltip } from 'antd';

const style = {
  amount: {
    fontWeight: 500,
    fontSize: '14px',
    color: '#21272A',
  },
  description: {
    fontWeight: 400,
    fontSize: '12px',
    color: '#697077',
  },
};
const columns: TableColumnsType<IUserTransactions> = [
  {
    title: 'Date',
    dataIndex: 'tx_time',
    render: (date: string) => new Date(date).toLocaleString(),
    key: 'date',
  },
  {
    title: 'Account',
    dataIndex: 'tx',
    key: 'account',
    render: (tx) => <>{truncateText(tx)}</>,
  },
  {
    width: 150,
    title: 'Quality',
    dataIndex: 'quality',
    key: 'quality',
  },
  {
    width: 200,
    title: 'Amount',
    key: 'amount',
    render: (data: IUserTransactions) => (
      <Flex wrap align="center" gap={10}>
        <img
          src={data.payment_info.currency.icon}
          alt="currency"
          width={24}
          height={24}
        />
        <Flex vertical>
          <span style={style.amount}>
            {data.amount} {data.payment_info.currency.symbol}
          </span>
          <span style={style.description}>
            ≈ {formatByEnUsNum(data.payment_info.exchange_rate * data.amount)}
            {' $'}
          </span>
        </Flex>
      </Flex>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    render: (data: IUserTransactions) => (
      <Space>
        <Button
          type="link"
          target="_blank"
          href={`https://explorer.solana.com/address/${data?.payment_info?.currency.mint || ''}${import.meta.env.VITE_STAGE === 'prod' ? '' : '?cluster=devnet'}`}
        >
          <Tooltip title="View transaction on Solana explorer">
            <img
              src="/image/common/solana-sol.webp"
              alt="icon"
              width={24}
              height={24}
            />
          </Tooltip>
        </Button>
        <Button
          type="link"
          target="_blank"
          href={`https://solscan.io/account/${data?.payment_info?.currency.mint || ''}${import.meta.env.VITE_STAGE === 'prod' ? '' : '?cluster=devnet'}`}
        >
          <Tooltip title="View transaction on Solscan">
            <img
              src="/image/common/solscan-logo.webp"
              alt="icon"
              width={24}
              height={24}
            />
          </Tooltip>
        </Button>
      </Space>
    ),
  },
];

export { columns };
