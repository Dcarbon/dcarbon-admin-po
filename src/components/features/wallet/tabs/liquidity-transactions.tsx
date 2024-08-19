import { getLiquidityTransactions } from '@/adapters/wallet';
import { QUERY_KEYS } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';

import TransactionLiquidityTable from '../table/liquidity';

const LiquidityTransactions = () => {
  const search = useSearch({
    from: '/_auth/wallet',
  });
  const { data: tableData } = useQuery({
    queryKey: [QUERY_KEYS.GET_WALLET_TRANSACTIONS.LIQUIDITY, search],
    queryFn: () => getLiquidityTransactions(search as { page: number }),
    enabled: !!search.page && search.tab == 2,
  });

  return (
    <TransactionLiquidityTable data={tableData as TransactionLiquidityPages} />
  );
};

export default LiquidityTransactions;
