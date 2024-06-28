import { Table } from 'antd';
import columns from '@components/features/project/table/column';

const ProjectTableList = ({ data }: { data: IProject[] }) => {
  return (
    <Table
      columns={columns}
      pagination={{
        defaultPageSize: 10,
      }}
      dataSource={data}
    />
  );
};

export default ProjectTableList;
