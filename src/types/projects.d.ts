interface IProject {
  projects: { id: string; project_name: string; slug: string }[];
  aggregation: {
    minted: {
      total: number;
      last_week_total: number;
    };
    sold: {
      total: number;
      last_week_total: number;
    };
  };
  devices: {
    id: string;
    credit: {};
    device_name: string;
    iot_device_id: string;
    is_active: boolean;
    minted: {
      total: number;
      last_week_total: number;
    };
    sold: {
      total: number;
      last_week_total: number;
    };
    project: {
      id: string;
      project_name: string;
      slug: string;
    };
  }[];
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
