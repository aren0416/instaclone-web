import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 20px 40px;
  margin-bottom: 10px;
  form {
    width: 100%;
    margin-top: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

function FormBox({ children }) {
  return <Container>{children}</Container>;
}

export default FormBox;
