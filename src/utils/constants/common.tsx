import {
  AppstoreOutlined,
  DollarOutlined,
  SettingFilled,
} from '@ant-design/icons';

type MenuType = {
  key: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  children?: {
    label: string;
    path: string;
  }[];
}[];

const QUERY_KEYS = {
  SIGN_IN: 'SIGN_IN',
  GET_USER: 'GET_USER',
  GET_PROJECTS_GENERAL: 'GET_PROJECTS_GENERAL',
  GET_PROJECTS_GENERAL_CHART: 'GET_PROJECTS_GENERAL_CHART',
  GET_PROJECT_BY_SLUG: 'GET_PROJECT_BY_SLUG',
  GET_WALLET: 'GET_WALLET',
  GET_WALLET_TRANSACTIONS: 'GET_WALLET_TRANSACTIONS',
};
const ROUTES_URL = {
  HOME: '/',
  PROJECT: '/project',
  SETTING: '/update-password',
  WALLET: '/wallet',
};
const MENU: MenuType = [
  {
    key: '/',
    label: 'Dashboard',
    path: ROUTES_URL.HOME,
    icon: <AppstoreOutlined />,
  },
  {
    key: '/wallet',
    label: 'Wallet',
    path: ROUTES_URL.WALLET,
    icon: <DollarOutlined />,
  },
  {
    key: 'update-password',
    label: 'Settings',
    path: '/update-password',
    icon: <SettingFilled />,
  },
];
const REQ_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;
const NO_IMAGE = '/common/no-avatar.png';
const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';

export {
  NO_IMAGE,
  ACCESS_TOKEN_STORAGE_KEY,
  REQ_METHODS,
  QUERY_KEYS,
  MENU,
  REFRESH_TOKEN_STORAGE_KEY,
  ROUTES_URL,
};
