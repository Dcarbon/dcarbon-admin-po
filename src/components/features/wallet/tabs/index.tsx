import { useNavigate, useSearch } from '@tanstack/react-router';
import { Segmented, Tabs, TabsProps } from 'antd';

import LiquidityTransactions from './liquidity-transactions';
import UserTransactions from './user-transactions';

const WalletTabs = () => {
  const searchParams = useSearch({
    from: '/_auth/wallet',
  });
  const navigate = useNavigate();
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'User transaction',
      destroyInactiveTabPane: true,
      children: <UserTransactions />,
    },
    {
      key: '2',
      label: 'Liquidity transaction',
      destroyInactiveTabPane: true,
      children: <LiquidityTransactions />,
    },
  ];
  const renderTabBar: TabsProps['renderTabBar'] = () => {
    return (
      <Segmented
        options={[
          {
            value: '1',
            label: 'User transaction ',
          },
          {
            value: '2',
            label: 'Liquidity transaction',
          },
        ]}
        size="large"
        value={searchParams.tab.toString() || '1'}
        onChange={(value) =>
          navigate({
            search: {
              ...searchParams,
              tab: +value,
            },
          })
        }
      />
    );
  };
  return (
    <Tabs
      items={items}
      destroyInactiveTabPane
      animated
      renderTabBar={renderTabBar}
      activeKey={searchParams.tab.toString() || '1'}
    />
  );
};

export default WalletTabs;
