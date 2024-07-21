import { getProjectBySlug } from '@/adapters/project';
import ColumnChart from '@/components/features/dashboard/column-chart';
import { QUERY_KEYS } from '@/utils/constants';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  Col,
  Flex,
  Row,
  Select,
  Space,
  Statistic,
  Typography,
} from 'antd';

import arrowDown from '/image/dashboard/arrow-down.svg';
import arrowUp from '/image/dashboard/arrow-up.svg';
import down from '/image/dashboard/down.svg';
import growth from '/image/dashboard/growth.svg';
import totalSold from '/image/dashboard/total-carbon-sold.svg';
import totalMinted from '/image/dashboard/total-minted.svg';

const postQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: [QUERY_KEYS.GET_PROJECT_BY_SLUG, slug],
    queryFn: () => getProjectBySlug(slug),
  });
export const Route = createFileRoute('/_auth/$slug')({
  loader: ({ context, params: { slug } }) => {
    const { queryClient } = context as any;
    return queryClient.ensureQueryData(postQueryOptions(slug));
  },
  component: () => <ProjectDetail />,
});
const ProjectDetail = () => {
  const slug = Route.useParams().slug;
  const { data } = useSuspenseQuery(postQueryOptions(slug));
  const percentCaculate = (value: number, lastValue: number) => {
    if (lastValue === 0) {
      return value > 0 ? 100 : 0;
    }
    const change = Math.abs((value - lastValue) / lastValue) * 100;
    return change;
  };
  return (
    <Row gutter={[16, 16]}>
      <Col sm={24} xl={10}>
        <Card>
          <Typography.Title level={4}> Description</Typography.Title>
          <div
            className="project-description"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </Card>
      </Col>
      <Col sm={24} xl={14}>
        <Row gutter={[16, 16]}>
          <Col className="dashboard-card">
            <Flex vertical gap={12}>
              <Row gutter={[12, 12]}>
                <Col sm={24} xxl={12}>
                  <Card>
                    <Flex justify="space-between">
                      <Flex vertical justify="space-between">
                        <Space align="center" size={20}>
                          <img
                            src={totalMinted}
                            width={38}
                            height={38}
                            alt="icon"
                          />
                          <span className="neutral-color-400">
                            Total Carbon Minted
                          </span>
                        </Space>
                        <Space size={10} align="baseline" wrap>
                          <span className="primary-color-600 dashboard-project-value">
                            {data?.carbon_aggregation?.minted.total ?? 0}
                          </span>
                          <Typography.Title
                            level={4}
                            className="dashboard-project-currency"
                          >
                            CARBON
                          </Typography.Title>
                        </Space>
                      </Flex>
                      {data ? (
                        <div className="dashboard-total-project">
                          <Statistic
                            title={
                              <img
                                src={
                                  data.carbon_aggregation.sold.total <
                                  data.carbon_aggregation.sold.last_week_total
                                    ? down
                                    : growth
                                }
                                height={58}
                                alt="down"
                              />
                            }
                            value={percentCaculate(
                              data.carbon_aggregation?.minted.total,
                              data.carbon_aggregation?.minted.last_week_total,
                            )}
                            precision={2}
                            className="dashboard-statistic"
                            prefix={
                              <Flex align="center">
                                <img
                                  src={
                                    data.carbon_aggregation.sold.total <
                                    data.carbon_aggregation.sold.last_week_total
                                      ? arrowDown
                                      : arrowUp
                                  }
                                  height={30}
                                  alt="arrow-up"
                                />
                              </Flex>
                            }
                            suffix="%"
                          />
                          <Typography.Text type="secondary">
                            VS Last Week
                          </Typography.Text>
                        </div>
                      ) : null}
                    </Flex>
                  </Card>
                </Col>
                <Col sm={24} xxl={12}>
                  <Card>
                    <Flex justify="space-between">
                      <Flex vertical justify="space-between">
                        <Space align="center" size={20}>
                          <img
                            src={totalSold}
                            width={38}
                            height={38}
                            alt="icon"
                          />
                          <span className="neutral-color-400">
                            Total Carbon Sold
                          </span>
                        </Space>
                        <Space size={10} align="baseline" wrap>
                          <span className="primary-color-600 dashboard-project-value">
                            {data.carbon_aggregation?.sold.total ?? 0}
                          </span>
                          <Typography.Title
                            level={4}
                            className="dashboard-project-currency"
                          >
                            CARBON
                          </Typography.Title>
                        </Space>
                      </Flex>
                      {data ? (
                        <div className="dashboard-total-project">
                          <Statistic
                            title={
                              <img
                                src={
                                  data.carbon_aggregation.sold.total <
                                  data.carbon_aggregation.sold.last_week_total
                                    ? down
                                    : growth
                                }
                                height={58}
                                alt="down"
                              />
                            }
                            value={percentCaculate(
                              data.carbon_aggregation?.sold.total,
                              data.carbon_aggregation?.sold.last_week_total,
                            )}
                            precision={2}
                            className="dashboard-statistic"
                            prefix={
                              <Flex align="center">
                                <img
                                  src={
                                    data.carbon_aggregation.sold.total <
                                    data.carbon_aggregation.sold.last_week_total
                                      ? arrowDown
                                      : arrowUp
                                  }
                                  height={30}
                                  alt="arrow-up"
                                />
                              </Flex>
                            }
                            suffix="%"
                          />
                          <Typography.Text type="secondary">
                            VS Last Week
                          </Typography.Text>
                        </div>
                      ) : null}
                    </Flex>
                  </Card>
                </Col>
              </Row>
            </Flex>
          </Col>
          <Col>
            <Card className="w-full">
              <Typography.Title level={4}>
                Total tokens has mint
              </Typography.Title>
              <Select
                options={[
                  { label: 'Month', value: 'month' },
                  { label: 'Week', value: 'week' },
                  { label: 'Day', value: 'day' },
                  { label: 'Year', value: 'year' },
                ]}
                size="middle"
                defaultValue={'month'}
              />
              <ColumnChart
                data={data.carbon_minted_chart.minted_token || []}
                times={data.carbon_minted_chart.times || []}
              />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
