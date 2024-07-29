interface IAggregationDashboardDto {
  total: number;

  last_week_total: number;
}
interface IProjectDashBoardDto {
  id: string;

  slug: string;

  project_name: string;

  minted: IAggregationDashboardDto;

  sold: IAggregationDashboardDto;
}
interface IProjectsDashBoard {
  projects: IProjectDashBoardDto[];
  aggregation: {
    minted: IAggregationDashboardDto;
    sold: IAggregationDashboardDto;
  };
}

interface IProjectChart {
  minted_token: number[];
  times: string[];
}
interface IProjectDetail {
  id: string;
  slug: string;
  project_name: string;
  description: string;
  carbon_minted?: number;
  carbon_aggregation: {
    minted: {
      total: number;
      last_week_total: number;
    };
    sold: {
      total: number;
      last_week_total: number;
    };
  };
  carbon_minted_chart: {
    minted_token: number[];
    times: string[];
  };
}
