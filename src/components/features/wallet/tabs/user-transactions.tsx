import { getUserTransactions } from '@/adapters/wallet';
import { QUERY_KEYS } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';

import TransactionUserTable from '../table/user';

const UserTransactions = () => {
  const search = useSearch({
    from: '/_auth/wallet',
  });
  const { data: tableData } = useQuery({
    queryKey: [QUERY_KEYS.GET_WALLET_TRANSACTIONS.USER, search],
    queryFn: () => getUserTransactions(search as { page: number }),
    enabled: !!search.page && search.tab == 1,
  });

  return <TransactionUserTable data={tableData as TransactionUserPages} />;
};

export default UserTransactions;
