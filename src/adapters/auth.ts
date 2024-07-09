import { API_ROUTES, REQ_METHODS } from '@/utils/constants';

import { request } from './xhr';

const getUserInfo = async () => {
  try {
    const response = await request<GeneralResponse<IUser>>(
      REQ_METHODS.GET,
      API_ROUTES.GET_USER,
    );
    return response.data;
  } catch (error) {
    console.error('getUserInfo error', error);
    throw error;
  }
};
const doLogin = async (data: { username: string; password: string }) => {
  try {
    const response = await request<GeneralResponse<IAuth>>(
      REQ_METHODS.POST,
      API_ROUTES.SIGN_IN,
      data,
    );
    return response.data.data;
  } catch (error) {
    console.error('doLogin error', error);
    throw error;
  }
};
const verifyLoginCode = async (data: { code: string }) => {
  try {
    const response = await request<GeneralResponse<IAuth>>(
      REQ_METHODS.POST,
      API_ROUTES.VERIFY_LOGIN_CODE,
      data,
    );
    return response.data.data;
  } catch (error) {
    console.error('setPws error', error);
    throw error;
  }
};
const setPws = async (data: { password: string; token: string }) => {
  try {
    const response = await request<GeneralResponse<{ status: string }>>(
      REQ_METHODS.POST,
      API_ROUTES.SET_PWS,
      data,
    );
    return response.data.data;
  } catch (error) {
    console.error('setPws error', error);
    throw error;
  }
};

export { doLogin, getUserInfo, setPws, verifyLoginCode };
