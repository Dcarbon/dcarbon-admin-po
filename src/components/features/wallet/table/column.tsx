import { Space, TableColumnsType, Typography } from 'antd';

const columns: TableColumnsType<ITransactionTable> = [
  {
    title: 'Date',
    dataIndex: 'tx_date_time',
    render: (date: string) => new Date(date).toLocaleString(),
    key: 'date',
  },
  {
    title: 'Account',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type: string) => <span className="transactions-type">{type}</span>,
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
];

export { columns };
