import { memo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import MyTable from '@components/common/table/my-table.tsx';

import { columns } from './column';

const TransactionTable = memo(({ data }: { data: TransactionPages }) => {
  const navigate = useNavigate();
  return (
    <>
      <MyTable
        columns={columns}
        dataSource={data?.data as ITransactionTable[]}
        scroll={{ x: 600, y: 500 }}
        tableLayout="auto"
        rowKey={'tx_id'}
        size="middle"
        pagination={{
          pageSize: 12,
          current: data?.paging.page || 1,
          total: data?.paging.total || 0,
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
    </>
  );
});
export default TransactionTable;
