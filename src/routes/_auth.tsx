import { useEffect } from 'react';
import AdminLayout from '@/components/common/admin-layout';
import { useAuth } from '@/contexts/auth-context';
import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    const { isAuthenticated } = context as any;
    if (!isAuthenticated) {
      throw redirect({
        to: '/signin',
        viewTransition: true,
      });
    }
  },

  component: () => <AuthLayout />,
});
const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate({
        to: '/signin',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};
