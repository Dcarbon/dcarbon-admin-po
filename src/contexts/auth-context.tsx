import * as React from 'react';
import { doLogin, verifyLoginCode } from '@/adapters/auth';
import { ERROR_MSG, SUCCESS_MSG } from '@/constants';
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '@/utils/constants';
import useModalAction from '@/utils/helpers/back-action.tsx';
import useMyNotification from '@/utils/helpers/my-notification.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message, Modal, notification } from 'antd';
import jwt from 'jsonwebtoken';

export interface AuthContext {
  isAuthenticated: boolean;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  user: IUser | undefined;
  isLoading: boolean;
  loginBycode: (data: { code: string }) => Promise<void>;
}

const AuthContext = React.createContext<AuthContext>({
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  user: undefined,
  isLoading: false,
  loginBycode: async () => {},
});

function getStoredAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

function setStoredRefreshToken(token: string | null) {
  if (token) {
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  }
}

function setStoredAccessToken(token: string | null) {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }
}

function userInfo(): IUser | undefined {
  let user: IUser | undefined;
  const token = getStoredAccessToken();
  if (token) {
    user = jwt.decode(token) as IUser;
  }
  return user;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<IUser | undefined>(userInfo());
  const client = useQueryClient();
  const [myNotification] = useMyNotification();
  React.useEffect(() => {
    setUser(userInfo());
  }, []);
  const logoutConfirm = useModalAction({
    title: 'Do you want to logout?',
    fn: () => {
      Modal.destroyAll();
      client.clear();
      setUser(undefined);
      setStoredAccessToken(null);
      setStoredRefreshToken(null);
    },
    option: {
      centered: true,
      maskClosable: true,
      destroyOnClose: true,
    },
  });
  const handleLogin = useMutation({
    mutationFn: doLogin,
    onSuccess: (data: IAuth) => {
      setUser(data.user_info);
      setStoredAccessToken(data.access_token);
      setStoredRefreshToken(data.refresh_token);
      myNotification({
        type: 'success',
        description: SUCCESS_MSG.AUTH.SIGN_IN_SUCCESS,
      });
    },
    onError: (error: any) => {
      myNotification({
        message: ERROR_MSG.AUTH.SIGN_ERROR,
        description: error || 'Something went wrong',
      });
    },
  });
  const handleLoginByCode = useMutation({
    mutationFn: verifyLoginCode,
    onSuccess: (data: IAuth) => {
      setUser(data.user_info);
      setStoredAccessToken(data.access_token);
      setStoredRefreshToken(data.refresh_token);
      message.success('Login success');
    },
    onError: (error: any) => {
      notification.error({
        message: 'Login failed',
        description: error,
      });
    },
  });
  const logout = React.useCallback(async () => {
    if (user) {
      return logoutConfirm();
    }
  }, [user, logoutConfirm]);

  const login = React.useCallback(
    async (data: { username: string; password: string }) => {
      return handleLogin.mutate(data);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const loginBycode = React.useCallback(
    async (data: { code: string }) => {
      return handleLoginByCode.mutate(data);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        isLoading: handleLogin.isPending,
        loginBycode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext };
