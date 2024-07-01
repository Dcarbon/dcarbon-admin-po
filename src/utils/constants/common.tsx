/* eslint-disable react-refresh/only-export-components */
import { ApartmentOutlined, ApiOutlined } from '@ant-design/icons';

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
  CREATE_PO: 'CREATE_PO',
};

const MENU: MenuType = [
  {
    key: 'Dashboard',
    label: 'Dashboard',
    path: '/',
    icon: <ApartmentOutlined />,
  },
  {
    key: 'projects',
    label: 'projects',
    path: '/project',
    icon: <ApiOutlined />,
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
};
