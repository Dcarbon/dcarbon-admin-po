import { getProjectBySlug } from '@/adapters/project';
import ColumnChart from '@/components/features/dashboard/column-chart';
import TotalOutputCard from '@/components/features/dashboard/total-output-card';
import { QUERY_KEYS } from '@/utils/constants';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Card, Col, Flex, Row, Select, Typography } from 'antd';

import totalSold from '/image/dashboard/total-carbon-sold.svg';
import totalMinted from '/image/dashboard/total-minted.svg';

const postQueryOptions = (
  slug: string,
  search?: { type?: string; chartYear?: string },
) =>
  queryOptions({
    queryKey: [
      QUERY_KEYS.GET_PROJECT_BY_SLUG,
      slug,
      search?.type,
      search?.chartYear,
    ],
    queryFn: () => getProjectBySlug(slug, search?.type, search?.chartYear),
    staleTime: 1000 * 60 * 2,
    enabled: !!slug || !!search?.type || !!search?.chartYear,
  });
export const Route = createFileRoute('/_auth/$slug')({
  validateSearch: (
    search?: Record<string, unknown>,
  ): { type?: string; chartYear?: string } => ({
    ...search,
  }),
  loader: ({ context, params: { slug }, location }) => {
    const { queryClient } = context as any;
    return queryClient.ensureQueryData(
      postQueryOptions(slug, location?.search),
    );
  },
  component: () => <ProjectDetail />,
});
const ProjectDetail = () => {
  const slug = Route.useParams().slug;
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data } = useQuery(postQueryOptions(slug, search));
  return (
    <>
      {data ? (
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
                      { label: 'Contract', value: 'contract' },
                      ...(data.carbon_minted_chart &&
                      data.carbon_minted_chart.list_contract_years.length > 0
                        ? data.carbon_minted_chart.list_contract_years.map(
                            (year) => ({
                              label: year,
                              value: year,
                            }),
                          )
                        : []),
                    ]}
                    onChange={(value) => {
                      if (value === 'contract') {
                        navigate({
                          to: '/$slug',
                          params: {
                            slug,
                          },
                          search: {
                            type: value,
                          },
                        });
                      } else {
                        navigate({
                          to: '/$slug',
                          params: {
                            slug,
                          },
                          search: {
                            chartYear: value,
                          },
                        });
                      }
                    }}
                    style={{ width: 120 }}
                    size="middle"
                    defaultValue={search.type || search.chartYear || 'contract'}
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
      ) : null}
    </>
  );
};
