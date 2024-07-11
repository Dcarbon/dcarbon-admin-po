import * as React from 'react';
import { doLogin, verifyLoginCode } from '@/adapters/auth';
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '@/utils/constants';
import { useMutation } from '@tanstack/react-query';
import { message, notification } from 'antd';

export interface AuthContext {
  isAuthenticated: boolean;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  user: string | null;
  isLoading: boolean;
  loginBycode: (data: { code: string }) => Promise<void>;
}

const AuthContext = React.createContext<AuthContext>({
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  user: null,
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<string | null>(getStoredAccessToken());
  const isAuthenticated = !!user;
  const handleLogin = useMutation({
    mutationFn: doLogin,
    onSuccess: (data: IAuth) => {
      setUser(data.user_info.username);
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
  const handleLoginByCode = useMutation({
    mutationFn: verifyLoginCode,
    onSuccess: (data: IAuth) => {
      setUser(data.user_info.username);
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
    setStoredAccessToken(null);
    setStoredRefreshToken(null);
    setUser(null);
  }, []);

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
  React.useEffect(() => {
    setUser(getStoredAccessToken());
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading: handleLogin.isSuccess || handleLoginByCode.isSuccess,
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
