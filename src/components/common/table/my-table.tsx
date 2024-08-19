import { Skeleton, Table, TableProps } from 'antd';
import styled from 'styled-components';

interface IProps extends TableProps {}

const MyTable = styled(Table).attrs<IProps>((props: IProps) => ({
  ...props,
  columns:
    (props?.dataSource && props.dataSource.length > 0) || !props.loading
      ? props.columns
      : props.columns?.map((column) => ({
          ...column,
          render: () => (
            <Skeleton
              key={column.key as React.Key}
              active
              paragraph={{ rows: 1, style: { height: 20 } }}
              loading
              round
              title={false}
            />
          ),
        })),
  dataSource:
    (props?.dataSource && props.dataSource.length > 0) || !props.loading
      ? props.dataSource
      : [...Array(7)].map((_, index) => ({
          key: `key${index}`,
        })),
}))`
  tbody > tr > td {
    border-bottom: 0 !important;
    padding: 14px 8px !important;
    font-size: 14px;
  }

  tbody > tr:nth-child(even) {
    background-color: var(--main-gray);
  }
  tbody > tr:nth-child(odd) {
    background-color: #ffffff;
  }
  thead {
    height: 56px;
  }

  thead > tr > th {
    background-color: rgba(255, 255, 255, 1) !important;
    font-size: 14px;
    color: rgba(79, 79, 79, 1);
  }

  thead > tr > th::before {
    background-color: unset !important;
  }
`;
export default MyTable;
