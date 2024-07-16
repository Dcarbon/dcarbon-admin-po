import { API_ROUTES, REQ_METHODS } from '@/utils/constants';
import { request } from './xhr';

const getProjectBySlug = async (slug: string) => {
  try {
    const response = await request<GeneralResponse<IProjectDetail>>(
      REQ_METHODS.GET,
      API_ROUTES.PROJECT_API + '/' + slug
    );
    return response.data.data;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};
export { getProjectBySlug };
