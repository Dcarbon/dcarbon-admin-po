import AdminLayout from '@/components/common/admin-layout';
import { useAuth } from '@/contexts/auth-context';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { Spin } from 'antd';

export const Route = createFileRoute('/_auth')({
  component: () => <AuthLayout />,
});
const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate({
      to: '/signin',
    });
  }
  return (
    <>
      {isAuthenticated ? (
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      ) : (
        <Spin spinning size="large" fullscreen />
      )}
    </>
  );
};
