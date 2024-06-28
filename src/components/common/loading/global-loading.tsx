// GlobalLoading.tsx
import { useIsFetching } from '@tanstack/react-query';
import { Spin } from 'antd';

const GlobalLoading = () => {
  const isFetching = useIsFetching();
  const isLoading = isFetching > 0;

  return isLoading ? <Spin size="large" spinning className="spin" /> : null;
};
export default GlobalLoading;
