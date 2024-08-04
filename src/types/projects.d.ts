interface IAggregationDashboardDto {
  total: number;

  compare_last_week_ratio: number;
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
      compare_last_week_ratio: number;
    };
    sold: {
      total: number;
      compare_last_week_ratio: number;
    };
  };
  carbon_minted_chart: {
    minted_token: number[];
    times: string[];
  };
}
