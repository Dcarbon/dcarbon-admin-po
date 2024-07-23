import { Input } from 'antd';
import styled from 'styled-components';

const MyInputPassword = styled(Input.Password).attrs((props) => ({
  ...props,
  allowClear: true,
}))`
  background-color: var(--main-gray);
`;
export default MyInputPassword;
