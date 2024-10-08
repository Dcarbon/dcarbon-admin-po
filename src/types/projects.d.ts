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
    listing: number;
  };
}

interface IProjectChart {
  minted_token: number[];
  times: string[];
  list_contract_years: number[];
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
    listing: number;
  };
  carbon_minted_chart: {
    minted_token: number[];
    times: string[];
    list_contract_years: number[];
  };
}
