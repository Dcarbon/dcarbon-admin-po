import { memo } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Link, useLocation, useRouterState } from '@tanstack/react-router';
import { Breadcrumb, Tooltip } from 'antd';

const capitalizeFirstLetter = (string: string) => {
  if (!string) return '';
  const title =
    string.charAt(0).toUpperCase() + string.slice(1).replace(/-/g, ' ');
  if (title.length > 20) {
    return (
      <Tooltip title={title} placement="bottom" color="#b1b1b1" fresh>
        {title.slice(0, 20) + '...'}
      </Tooltip>
    );
  }
  return title;
};

const Breadcrumbs = memo(() => {
  const location = useLocation();
  const routerState = useRouterState();
  const data: any = routerState.matches.find(
    (match) => match.routeId === '/_auth/$slug',
  )?.loaderData;
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    if (data?.slug && data.slug === snippet) {
      return {
        key: url,
        title: capitalizeFirstLetter(data.project_name),
      };
    }
    return {
      key: url,
      title: routerState.isLoading ? (
        ''
      ) : index === pathSnippets.length - 1 ? (
        capitalizeFirstLetter(snippet)
      ) : (
        <Link to={url}>{capitalizeFirstLetter(snippet)}</Link>
      ),
    };
  });
  const breadcrumbItems = [
    {
      key: 'home',
      title: (
        <Link to="/">
          <HomeOutlined />
        </Link>
      ),
    },
    ...extraBreadcrumbItems,
  ];

  return (
    <Breadcrumb className="breadcrumbs-container" items={breadcrumbItems} />
  );
});

export default Breadcrumbs;
