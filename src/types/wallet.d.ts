interface ITransactionTable {
  tx_date_time: string;
  account: string;
  type: string;
  amount: number;
}
type ILiquidityTransaction = {
  id: string;
  tx_time: string;
  payer: {
    id: string;
    name: string;
  };
  type: string;
  status: string;
  amount: number;
  fees: number;
};

interface IUserTransactions {
  tx: string;
  tx_time: string;
  mint: string;
  quality: number;
  amount: number;
  payment_info: {
    currency: {
      mint: string;
      name: string;
      symbol: string;
      icon: string;
    };
    exchange_rate: number;
  };
}

interface IWallet {
  wallet: number;
  carbon: number;
  exchange_rate: number;
  exchange_rate_currency: string;
  carbon_chart: {
    labels: string[];
    data: number[];
  };
  dcarbon: number;
}

type TransactionLiquidityPages = {
  data: ILiquidityTransaction[];
  paging: {
    total: number;
    page: number;
    limit: number;
  };
};
type TransactionUserPages = {
  data: IUserTransactions[];
  paging: {
    total: number;
    page: number;
    limit: number;
  };
};
type TransactionPagesRequest = {
  page: number;
  limit: number;
  sort_field: string;
  sort_type: string;
};
