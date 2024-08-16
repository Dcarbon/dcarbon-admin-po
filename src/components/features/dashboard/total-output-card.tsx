import { formatByEnUsNum } from '@/utils/helpers';
import { Card, Flex, Skeleton, Space, Statistic, Typography } from 'antd';

import arrowDown from '/image/dashboard/arrow-down.svg';
import arrowUp from '/image/dashboard/arrow-up.svg';
import down from '/image/dashboard/down.svg';
import growth from '/image/dashboard/growth.svg';

interface IGeneralData {
  data: {
    total: number;
    compare_last_week_ratio: number;
  };

  img: string;
  title: string;
  loading?: boolean;
}
const TotalOutputCard = ({ img, data, title, loading }: IGeneralData) => {
  const percentCalculate = (value: number) => {
    return value * 100;
  };
  return (
    <Card>
      <Flex justify="space-between">
        <Flex vertical justify="space-between">
          <Space align="center" size={20}>
            <img src={img} width={38} height={38} alt="icon" />
            <span className="neutral-color-400">{title}</span>
          </Space>
          {!loading ? (
            <Space size={10} align="baseline">
              <span className="primary-color-600 dashboard-project-value">
                {formatByEnUsNum(data.total ?? 0)}
              </span>
              <Typography.Title
                level={4}
                className="dashboard-project-currency"
              >
                CARBON
              </Typography.Title>
            </Space>
          ) : (
            <Skeleton.Input active style={{ height: 60 }} />
          )}
        </Flex>
        {data ? (
          <div className="dashboard-total-project">
            <Statistic
              title={
                !loading ? (
                  <img
                    src={data.compare_last_week_ratio < 0 ? down : growth}
                    height={58}
                    alt="down"
                  />
                ) : (
                  <Skeleton.Avatar
                    shape="square"
                    active
                    style={{ height: 65, width: 90 }}
                  />
                )
              }
              value={
                !loading ? percentCalculate(data.compare_last_week_ratio) : 0
              }
              precision={2}
              className="dashboard-statistic"
              prefix={
                <Flex align="center">
                  {!loading ? (
                    <img
                      src={
                        data.compare_last_week_ratio < 0 ? arrowDown : arrowUp
                      }
                      height={30}
                      alt="arrow-up"
                    />
                  ) : (
                    <Skeleton.Avatar active style={{ height: 30, width: 30 }} />
                  )}
                </Flex>
              }
              suffix="%"
            />
            <Typography.Text type="secondary">VS Last Week</Typography.Text>
          </div>
        ) : null}
      </Flex>
    </Card>
  );
};

export default TotalOutputCard;
