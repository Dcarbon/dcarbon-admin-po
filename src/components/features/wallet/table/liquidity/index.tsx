import { memo } from 'react';
import { useIsFetching } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import MyTable from '@components/common/table/my-table.tsx';

import { columns } from './columns';

const TransactionLiquidityTable = memo(
  ({ data }: { data: TransactionLiquidityPages }) => {
    const navigate = useNavigate();
    const isFetching = useIsFetching();
    const isLoading = isFetching > 0;
    const search = useSearch({
      from: '/_auth/wallet',
    });
    return (
      <>
        <MyTable
          columns={columns}
          dataSource={data?.data as ILiquidityTransaction[]}
          scroll={{ x: 500, y: '58vh' }}
          loading={
            isLoading
              ? {
                  spinning: isLoading || !data,
                  indicator: <div />,
                }
              : false
          }
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
                  ...search,
                  page,
                },
              });
            },
          }}
        />
      </>
    );
  },
);
export default TransactionLiquidityTable;
