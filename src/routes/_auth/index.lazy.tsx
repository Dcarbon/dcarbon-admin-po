import {
  getProjectsGeneral,
  getProjectsGeneralChart,
} from '@/adapters/dashboard';
import ColumnChart from '@/components/features/dashboard/column-chart';
import Donutchart from '@/components/features/dashboard/donut-chart';
import { QUERY_KEYS } from '@/utils/constants';
import { formatByEnUsNum } from '@/utils/helpers';
import { useQueries } from '@tanstack/react-query';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import {
  Card,
  Col,
  Empty,
  Flex,
  Row,
  Select,
  Space,
  Statistic,
  Typography,
} from 'antd';
import deviceLogo from 'public/image/dashboard/icon-dcarbon-blue.svg';

import arrowDown from '/image/dashboard/arrow-down.svg';
import arrowUp from '/image/dashboard/arrow-up.svg';
import down from '/image/dashboard/down.svg';
import growth from '/image/dashboard/growth.svg';
import totalSold from '/image/dashboard/total-carbon-sold.svg';
import totalMinted from '/image/dashboard/total-minted.svg';

export const Route = createLazyFileRoute('/_auth/')({
  component: () => <Index />,
});

function Index() {
  const [{ data: generalData }, { data: projectChartData }] = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEYS.GET_PROJECTS_GENERAL],
        queryFn: () => getProjectsGeneral(),
      },
      {
        queryKey: [QUERY_KEYS.GET_PROJECTS_GENERAL_CHART],
        queryFn: () => getProjectsGeneralChart(),
      },
    ],
  });
  const percentCaculate = (value: number, lastValue: number) => {
    if (lastValue === 0) {
      return value > 0 ? 100 : 0;
    }
    const change = Math.abs((value - lastValue) / lastValue) * 100;
    return change;
  };
  const percentCaculateWithTag = (value: number, lastValue: number) => {
    if (lastValue === 0) {
      return value > 0 ? 100 : 0;
    }
    const change = (value - lastValue) / lastValue;
    return change < 0 ? (
      <Typography.Text type="danger">{change * 100}%</Typography.Text>
    ) : (
      <Typography.Text type="success">{change * 100}%</Typography.Text>
    );
  };
  return (
    <Flex className="h-full" vertical gap={13}>
      <Row className="dashboard-row" gutter={[16, 16]}>
        <Col className="dashboard-card" xs={24} lg={8}>
          <Card>
            <Typography.Title level={4}>Over View</Typography.Title>
            <Donutchart data={[40, 53, 34, 23, 25, 23]} />
          </Card>
        </Col>
        <Col xs={24} lg={16} className="dashboard-card">
          <Card>
            <Typography.Title level={4}>Total tokens has mint</Typography.Title>
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
              data={projectChartData?.minted_token || []}
              times={projectChartData?.times || []}
            />
          </Card>
        </Col>
      </Row>
      <Row className="dashboard-row" gutter={[16, 16]}>
        <Col xs={24} xxl={8} className="dashboard-card">
          <Flex vertical gap={12}>
            <Typography.Title level={4}> Total project output</Typography.Title>
            <Row gutter={[12, 12]}>
              <Col sm={24} lg={12} xl={24}>
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
                      <Space size={10} align="baseline">
                        <span className="primary-color-600 dashboard-project-value">
                          {formatByEnUsNum(
                            generalData?.aggregation?.minted.total ?? 0,
                          )}
                        </span>
                        <Typography.Title level={4}>CARBON</Typography.Title>
                      </Space>
                    </Flex>
                    {generalData ? (
                      <div className="dashboard-total-project">
                        <Statistic
                          title={
                            <img
                              src={
                                generalData.aggregation.sold.total <
                                generalData?.aggregation.sold.last_week_total
                                  ? down
                                  : growth
                              }
                              height={58}
                              alt="down"
                            />
                          }
                          value={percentCaculate(
                            generalData?.aggregation?.minted.total,
                            generalData?.aggregation?.minted.last_week_total,
                          )}
                          precision={2}
                          className="dashboard-statistic"
                          prefix={
                            <Flex align="center">
                              <img
                                src={
                                  generalData.aggregation.sold.total <
                                  generalData?.aggregation.sold.last_week_total
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
              <Col sm={24} lg={12} xl={24}>
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
                      <Space size={10} align="baseline">
                        <span className="primary-color-600 dashboard-project-value">
                          {formatByEnUsNum(
                            generalData?.aggregation?.sold.total ?? 0,
                          )}
                        </span>
                        <Typography.Title level={4}>CARBON</Typography.Title>
                      </Space>
                    </Flex>
                    {generalData ? (
                      <div className="dashboard-total-project">
                        <Statistic
                          title={
                            <img
                              src={
                                generalData.aggregation.sold.total <
                                generalData?.aggregation.sold.last_week_total
                                  ? down
                                  : growth
                              }
                              height={58}
                              alt="down"
                            />
                          }
                          value={percentCaculate(
                            generalData?.aggregation?.sold.total,
                            generalData?.aggregation?.sold.last_week_total,
                          )}
                          precision={2}
                          className="dashboard-statistic"
                          prefix={
                            <Flex align="center">
                              <img
                                src={
                                  generalData.aggregation.sold.total <
                                  generalData?.aggregation.sold.last_week_total
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
        <Col xs={24} xxl={16} className="dashboard-card">
          <Flex vertical gap={12}>
            <Typography.Title level={4}>Device List</Typography.Title>
            <Flex vertical gap={16} className="dashboard-project-list">
              {generalData && generalData?.projects.length > 0 ? (
                generalData.devices.map((device) => (
                  <Card>
                    <Row className="dashboard-project-row" gutter={[12, 12]}>
                      <Col sm={24} className="project-column-item" xl={2}>
                        <img
                          src={deviceLogo}
                          width={60}
                          height={60}
                          alt="icon"
                        />
                      </Col>
                      <Col
                        sm={24}
                        md={12}
                        className="project-column-item"
                        xl={3}
                      >
                        <Typography.Text>{device.device_name}</Typography.Text>
                        <Typography.Text type="secondary">
                          Device name{' '}
                        </Typography.Text>
                      </Col>
                      <Col
                        sm={24}
                        md={12}
                        className="project-column-item"
                        xl={6}
                      >
                        <Typography.Text>
                          {formatByEnUsNum(device.minted.total)} Dcarbon
                        </Typography.Text>
                        <Typography.Text type="secondary">
                          Number of tokens has mint
                        </Typography.Text>
                      </Col>
                      <Col
                        sm={24}
                        md={12}
                        className="project-column-item"
                        xl={6}
                      >
                        <Typography.Text>
                          {formatByEnUsNum(device.sold.total)} Dcarbon
                        </Typography.Text>
                        <Typography.Text type="secondary">
                          Total carbon sold{' '}
                        </Typography.Text>
                      </Col>
                      <Col
                        sm={24}
                        md={12}
                        className="project-column-item"
                        xl={4}
                      >
                        <Typography.Text type="success">
                          {percentCaculateWithTag(
                            device.minted.total,
                            device.minted.last_week_total,
                          )}
                          %
                        </Typography.Text>
                        <Typography.Text type="secondary">
                          VS Last Week
                        </Typography.Text>
                      </Col>
                      <Col
                        sm={24}
                        md={12}
                        className="project-column-item"
                        xl={3}
                      >
                        <Link
                          to="/$slug"
                          params={{ slug: device.project.slug }}
                          className="dashboard-project-link"
                        >
                          View Details
                        </Link>
                      </Col>
                    </Row>
                  </Card>
                ))
              ) : (
                <Empty description="There are no projects yet" />
              )}
            </Flex>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
}
