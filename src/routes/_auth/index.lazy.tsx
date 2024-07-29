import {
  getProjectsGeneral,
  getProjectsGeneralChart,
} from '@/adapters/dashboard';
import ColumnChart from '@/components/features/dashboard/column-chart';
import DonutChart from '@/components/features/dashboard/donut-chart';
import DCarbonIc from '@/icons/dcarbon.icon.tsx';
import { QUERY_KEYS } from '@/utils/constants';
import { formatByEnUsNum } from '@/utils/helpers';
import Icon from '@ant-design/icons';
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

import arrowDown from '/image/dashboard/arrow-down.svg';
import arrowUp from '/image/dashboard/arrow-up.svg';
import down from '/image/dashboard/down.svg';
import growth from '/image/dashboard/growth.svg';
import totalSold from '/image/dashboard/total-carbon-sold.svg';
import totalMinted from '/image/dashboard/total-minted.svg';

const colors = [
  '#FFBB38', // Red-Orange
  '#16DBCC', // Lime Green
  '#4C78FF', // Blue
  '#FF82AC', // Pink
  '#33FFA6', // Aquamarine
  '#FF33FF', // Magenta
  '#33A6FF', // Light Blue
  '#A6FF33', // Yellow-Green
  '#5733FF', // Indigo
  '#A633FF', // Purple
  '#FFAA33', // Amber
  '#33FFAA', // Sea Green
  '#FF33AA', // Hot Pink
  '#33AAFF', // Sky Blue
  '#AAFF33', // Chartreuse
  '#FF5733', // Coral
  '#FFAA33', // Gold
  '#FF33FF', // Deep Pink
  '#AA33FF', // Violet
  '#33FFAA', // Mint
  '#AA33FF', // Orchid
  '#FF33AA', // Fuchsia
  '#33FFAA', // Emerald
  '#FF33A6', // Magenta-Pink
];
const DCarbonIcon = ({ size, color }: { size: number; color: string }) => (
  <Icon component={() => <DCarbonIc size={size} color={color} />} />
);

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
  const percentCalculate = (value: number, lastValue: number) => {
    if (lastValue === 0) {
      return value > 0 ? 100 : 0;
    }
    return Math.abs((value - lastValue) / lastValue) * 100;
  };
  const percentCalculateWithTag = (value: number, lastValue: number) => {
    if (lastValue === 0) {
      return value > 0 ? 100 : 0;
    }
    const change = (value - lastValue) / lastValue;
    return change < 0 ? (
      <Typography.Text type="danger">
        {Number((change * 100).toFixed(2))}%
      </Typography.Text>
    ) : (
      <Typography.Text type="success">
        {Number((change * 100).toFixed(2))}%
      </Typography.Text>
    );
  };
  const getDonutChartData = (projects: IProjectDashBoardDto[]) => {
    const labels = projects?.map((project) => project.project_name);
    const data = projects?.map((info) => Number(info.minted?.total || 1));
    return {
      labels,
      data,
      isAllEmpty: !data?.find((info) => info > 0),
      colors,
    };
  };
  return (
    <Flex className="dashboard-container" vertical gap={13}>
      <Row className="dashboard-row" gutter={[16, 16]}>
        <Col className="dashboard-card" xs={24} lg={8}>
          <Card>
            <Typography.Title level={4}>Over View</Typography.Title>
            <DonutChart
              config={getDonutChartData(generalData?.projects || [])}
            />
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
                        <Typography.Title
                          level={4}
                          className="dashboard-project-currency"
                        >
                          CARBON
                        </Typography.Title>
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
                          value={percentCalculate(
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
                        <Typography.Title
                          level={4}
                          className="dashboard-project-currency"
                        >
                          CARBON
                        </Typography.Title>
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
                          value={percentCalculate(
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
            <Typography.Title level={4}>Project List</Typography.Title>
            <Flex vertical gap={16} className="dashboard-project-list">
              {generalData && generalData?.projects.length > 0 ? (
                generalData.projects.map((project, idx) => {
                  const color = colors[idx] || colors[0];
                  return (
                    <Card key={project.id}>
                      <Row className="dashboard-project-row" gutter={[12, 12]}>
                        <Col sm={24} className="project-column-item" xl={2}>
                          <div
                            style={{
                              borderRadius: 20,
                              display: 'flex',
                              padding: '10px',
                              backgroundColor: `${color}40`,
                            }}
                          >
                            <DCarbonIcon size={32} color={color} />
                          </div>
                        </Col>
                        <Col
                          sm={24}
                          md={12}
                          className="project-column-item"
                          xl={4}
                        >
                          <Typography.Text>
                            {project.project_name}
                          </Typography.Text>
                          <Typography.Text type="secondary"></Typography.Text>
                        </Col>
                        <Col
                          sm={24}
                          md={12}
                          className="project-column-item"
                          xl={6}
                        >
                          <Typography.Text>
                            {formatByEnUsNum(project.minted.total)} Dcarbon
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
                            {formatByEnUsNum(project.sold.total)} Dcarbon
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
                            {percentCalculateWithTag(
                              project.minted.total,
                              project.minted.last_week_total,
                            )}
                          </Typography.Text>
                          <Typography.Text type="secondary">
                            VS Last Week
                          </Typography.Text>
                        </Col>
                        <Col
                          sm={24}
                          md={12}
                          className="project-column-item"
                          xl={2}
                        >
                          <Link
                            to="/$slug"
                            params={{ slug: project.slug }}
                            className="dashboard-project-link"
                          >
                            View
                          </Link>
                        </Col>
                      </Row>
                    </Card>
                  );
                })
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
