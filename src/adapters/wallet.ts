import { API_ROUTES, REQ_METHODS } from '@/utils/constants';

import { request } from './xhr';

const getWallet = async () => {
  try {
    const response = await request<GeneralResponse<IWallet>>(
      REQ_METHODS.GET,
      API_ROUTES.GET_WALLET,
    );
    return response.data.data;
  } catch (error) {
    console.error('getGeneralProjectsChart error', error);
    throw error;
  }
};
const getWalletTransactions = async (data: { page: number }) => {
  try {
    const response = await request<TransactionPages>(
      REQ_METHODS.GET,
      API_ROUTES.GET_WALLET_TRANSACTIONS,
      data,
    );
    return response.data;
  } catch (error) {
    console.error('getGeneralProjectsChart error', error);
    throw error;
  }
};
export { getWallet, getWalletTransactions };
