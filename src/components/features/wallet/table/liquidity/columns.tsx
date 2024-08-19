import { Space, TableColumnsType, Typography } from 'antd';

const columns: TableColumnsType<ILiquidityTransaction> = [
  {
    title: 'Date',
    dataIndex: 'tx_time',
    render: (date: string) => new Date(date).toLocaleString(),
    key: 'date',
  },
  {
    title: 'Account',
    dataIndex: 'payer',
    key: 'account',
    render: (payer) => <span>{payer.name}</span>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type) => <span className="transactions-type">{type}</span>,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount: number) => (
      <Space wrap>
        <Typography.Text>${amount}</Typography.Text>
      </Space>
    ),
  },
  {
    title: 'Fee',
    dataIndex: 'fees',
    key: 'fee',
    render: (fee) => <span>${fee}</span>,
  },
];

export { columns };
