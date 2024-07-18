const API_ROUTES = {
  SIGN_IN: 'auth/sign-in',
  GET_USER: 'auth/user-info',
  SET_PWS: 'po/active',
  VERIFY_LOGIN_CODE: 'auth/sign-in-with-redirect',
  REQUEST_RESET_PASSWORD: 'auth/request-reset-password',
  CHANGE_PASSWORD: 'auth/change-password',
  RESET_PASSWORD: 'auth/reset-password',
  GET_GENERAL_PROJECTS: 'dashboard/project-credit',
  GET_GENERAL_PROJECTS_CHART: 'dashboard/minted-credit-chart',
  PROJECT_API: 'projects',
  GET_WALLET: 'wallet',
  GET_WALLET_TRANSACTIONS: 'wallet/transactions',
};
export { API_ROUTES };
