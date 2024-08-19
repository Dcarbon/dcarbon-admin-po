import { API_ROUTES, REQ_METHODS } from '@/utils/constants';

import { request } from './xhr';

const getWallet = async () => {
  try {
    const response = await request<GeneralResponse<IWallet>>(
      REQ_METHODS.GET,
      API_ROUTES.WALLET.GET_WALLET,
    );
    return response.data.data;
  } catch (error) {
    console.error('getGeneralProjectsChart error', error);
    throw error;
  }
};
const getUserTransactions = async (data: { page: number }) => {
  try {
    const response = await request<TransactionUserPages>(
      REQ_METHODS.GET,
      API_ROUTES.WALLET.GET_USER_TRANSACTIONS,
      data,
    );
    return response.data;
  } catch (error) {
    console.error('getGeneralProjectsChart error', error);
    throw error;
  }
};
const getLiquidityTransactions = async (data: { page: number }) => {
  try {
    const response = await request<TransactionLiquidityPages>(
      REQ_METHODS.GET,
      API_ROUTES.WALLET.GET_LIQUIDITY_TRANSACTIONS,
      data,
    );
    return response.data;
  } catch (error) {
    console.error('getGeneralProjectsChart error', error);
    throw error;
  }
};
export { getWallet, getLiquidityTransactions, getUserTransactions };
