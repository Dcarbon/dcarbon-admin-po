import { API_ROUTES, REQ_METHODS } from '@/utils/constants';

import { request } from './xhr';

const getProjectsGeneral = async () => {
  try {
    const response = await request<GeneralResponse<IProjectsDashBoard>>(
      REQ_METHODS.GET,
      API_ROUTES.GET_GENERAL_PROJECTS,
    );
    return response.data.data;
  } catch (error) {
    console.error('getGeneralProjects error', error);
    throw error;
  }
};
const getProjectsGeneralChart = async (data: {
  [key: string]: string | undefined;
}) => {
  try {
    const response = await request<GeneralResponse<IProjectChart>>(
      REQ_METHODS.GET,
      API_ROUTES.GET_GENERAL_PROJECTS_CHART,
      data,
    );
    return response.data.data;
  } catch (error) {
    console.error('getGeneralProjectsChart error', error);
    throw error;
  }
};
export { getProjectsGeneral, getProjectsGeneralChart };
