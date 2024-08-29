import { useState } from 'react';
import {
  getProjectsGeneral,
  getProjectsGeneralChart,
} from '@/adapters/dashboard';
import ColumnChart from '@/components/features/dashboard/column-chart';
import DonutChart from '@/components/features/dashboard/donut-chart';
import TotalOutputCard from '@/components/features/dashboard/total-output-card';
import { useAuth } from '@/contexts/auth-context';
import DCarbonIc from '@/icons/dcarbon.icon.tsx';
import { QUERY_KEYS } from '@/utils/constants';
import { formatByEnUsNum, isEmpty } from '@/utils/helpers';
import Icon from '@ant-design/icons';
import { useQueries } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, Col, Empty, Flex, Row, Select, Tooltip, Typography } from 'antd';

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

export const Route = createFileRoute('/_auth/')({
  validateSearch: (
    search: Record<string, unknown>,
  ): { type?: string; chart_year?: string } => ({
    ...search,
  }),
  component: () => <Index />,
});

function Index() {
  const { user, isAuthenticated } = useAuth();
  const [search, setSearch] = useState<{ type?: string; chart_year?: string }>({
    type: 'contract',
  });
  const [{ data: generalData }, { data: projectChartData }] = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEYS.GET_PROJECTS_GENERAL, user?.username],
        queryFn: () => getProjectsGeneral(),
      },
      {
        queryKey: [
          QUERY_KEYS.GET_PROJECTS_GENERAL_CHART,
          user?.username,
          search,
        ],
        queryFn: () => {
          return getProjectsGeneralChart(
            !isEmpty(search) ? search : { type: 'contract' },
          );
        },
        staleTime: 1000 * 60 * 2,
        enabled: isAuthenticated || !!search.type || !!search.chart_year,
      },
    ],
  });
  const percentCalculateWithTag = (value: number) => {
    return value < 0 ? (
      <Typography.Text type="danger">
        {Number((value * 100).toFixed(2))} %
      </Typography.Text>
    ) : (
      <Typography.Text type="success">
        {Number((value * 100).toFixed(2))} %
      </Typography.Text>
    );
  };
  const getDonutChartData = (projects: IProjectDashBoardDto[]) => {
    const labels = projects?.map((project) => project.project_name);
    const data = projects?.map((info) => Number(info.minted?.total || 0));
    const id = projects?.map((info) => +info.id);
    return {
      labels,
      data,
      isAllEmpty: !data?.find((info) => info > 0),
      colors,
      id,
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
                { label: 'Contract', value: 'contract' },
                ...(projectChartData &&
                projectChartData.list_contract_years.length > 0
                  ? projectChartData.list_contract_years.map((year) => ({
                      label: year,
                      value: year,
                    }))
                  : []),
              ]}
              onChange={(value) => {
                if (value === 'contract') {
                  setSearch({ type: value });
                } else {
                  setSearch({ chart_year: value });
                }
              }}
              style={{ width: 120 }}
              size="middle"
              defaultValue={search.type || search.chart_year || 'contract'}
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
            <Row gutter={[12, 12]} className="dashboard-projects-output">
              {generalData ? (
                <>
                  <Col sm={24} lg={12} xxl={24}>
                    <TotalOutputCard
                      img={totalMinted}
                      data={generalData?.aggregation.minted}
                      title="Total DCO2 Minted"
                    />
                  </Col>
                  <Col sm={24} lg={12} xxl={24}>
                    <TotalOutputCard
                      img={totalSold}
                      data={generalData?.aggregation.sold}
                      title="Total DCO2 Sold"
                    />
                  </Col>
                  <Col sm={24} lg={12} xxl={24}>
                    <TotalOutputCard
                      img={totalSold}
                      analyticsDisabled
                      data={generalData?.aggregation.sold}
                      title="Total DCO2 Listing"
                    />
                  </Col>
                </>
              ) : null}
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
                        <Col
                          sm={2}
                          span={5}
                          className="project-column-item"
                          xl={2}
                        >
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
                          sm={19}
                          md={19}
                          span={19}
                          className="project-column-item"
                          xl={5}
                        >
                          <Typography.Text>
                            <Tooltip
                              title={project.project_name}
                              color="#b1b1b1"
                              fresh
                            >
                              {project.project_name.length > 20
                                ? project.project_name.slice(0, 20) + '...'
                                : project.project_name}
                            </Tooltip>
                          </Typography.Text>
                          <Typography.Text type="secondary"></Typography.Text>
                        </Col>
                        <Col
                          sm={12}
                          className="project-column-item"
                          xl={6}
                          lg={7}
                          md={8}
                        >
                          <Typography.Text>
                            {formatByEnUsNum(project.minted.total)} DCO2
                          </Typography.Text>
                          <Typography.Text type="secondary">
                            Number of tokens has mint
                          </Typography.Text>
                        </Col>
                        <Col
                          sm={12}
                          className="project-column-item"
                          xl={6}
                          lg={7}
                          md={8}
                          span={12}
                        >
                          <Typography.Text>
                            {formatByEnUsNum(project.sold.total)} DCO2
                          </Typography.Text>
                          <Typography.Text type="secondary">
                            Total DCO2 sold{' '}
                          </Typography.Text>
                        </Col>
                        <Col
                          span={12}
                          sm={6}
                          lg={7}
                          className="project-column-item"
                          xl={3}
                        >
                          <Typography.Text type="success">
                            {percentCalculateWithTag(
                              project.minted.compare_last_week_ratio,
                            )}{' '}
                          </Typography.Text>
                          <Typography.Text type="secondary">
                            VS Last Week
                          </Typography.Text>
                        </Col>
                        <Col
                          sm={12}
                          className="project-column-item"
                          xl={2}
                          md={2}
                          lg={2}
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
