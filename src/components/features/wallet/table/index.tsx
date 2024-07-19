import { memo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Empty, Table } from 'antd';

import { columns } from './column';

const TransactionTable = memo(({ data }: { data: TransactionPages }) => {
  const navigate = useNavigate();
  return (
    <>
      {data ? (
        <Table
          columns={columns}
          dataSource={data?.data as ITransactionTable[]}
          scroll={{ x: 600, y: 500 }}
          tableLayout="auto"
          rowKey={'tx_id'}
          size="middle"
          loading={!data.data}
          pagination={{
            pageSize: 12,
            current: data.paging.page || 1,
            total: data.paging.total || 0,
            showSizeChanger: false,
            onChange: (page) => {
              navigate({
                from: '/wallet',
                to: '/wallet',
                search: {
                  page,
                },
              });
            },
          }}
        />
      ) : (
        <Empty />
      )}
    </>
  );
});
export default TransactionTable;
