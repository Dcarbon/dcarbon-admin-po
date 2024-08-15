import { getProjectBySlug } from '@/adapters/project';
import ColumnChart from '@/components/features/dashboard/column-chart';
import TotalOutputCard from '@/components/features/dashboard/total-output-card';
import { QUERY_KEYS } from '@/utils/constants';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Card, Col, Flex, Row, Select, Typography } from 'antd';

import totalSold from '/image/dashboard/total-carbon-sold.svg';
import totalMinted from '/image/dashboard/total-minted.svg';

const postQueryOptions = (slug: string, search?: { type?: string }) =>
  queryOptions({
    queryKey: [QUERY_KEYS.GET_PROJECT_BY_SLUG, slug, search?.type],
    queryFn: () => getProjectBySlug(slug, search?.type),
  });
export const Route = createFileRoute('/_auth/$slug')({
  validateSearch: (search: Record<string, unknown>): { type: string } => ({
    type: search.type as string,
  }),
  loader: ({ context, params: { slug }, location }) => {
    const { queryClient } = context as any;
    return queryClient.ensureQueryData(postQueryOptions(slug, location.search));
  },
  component: () => <ProjectDetail />,
});
const ProjectDetail = () => {
  const slug = Route.useParams().slug;
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data } = useSuspenseQuery(postQueryOptions(slug, search));

  return (
    <Row gutter={[16, 16]}>
      <Col sm={24} xl={10}>
        <Card>
          <Typography.Title level={4} style={{ margin: '0 0 10px 0' }}>
            {' '}
            Description
          </Typography.Title>
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
                <Col lg={12}>
                  <TotalOutputCard
                    img={totalMinted}
                    data={data.carbon_aggregation.minted}
                    title="Total Carbon Minted"
                  />
                </Col>
                <Col lg={12}>
                  <TotalOutputCard
                    img={totalSold}
                    data={data.carbon_aggregation.sold}
                    title="Total Carbon Sold"
                  />
                </Col>
              </Row>
            </Flex>
          </Col>
          <Col>
            <Card className="w-full">
              <Typography.Title level={4} style={{ margin: '5px 0' }}>
                Total tokens has mint
              </Typography.Title>
              <Select
                options={[
                  { label: 'Month', value: 'month' },
                  { label: 'Contract', value: 'contract' },
                ]}
                onChange={(value) =>
                  navigate({
                    search: {
                      type: value,
                    },
                  })
                }
                size="middle"
                defaultValue={search.type || 'month'}
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
