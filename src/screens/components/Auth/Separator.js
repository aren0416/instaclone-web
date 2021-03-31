import styled from "styled-components";

const SSeparator = styled.div`
  width: 100%;
  margin: 20px 0 30px 0;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(219, 219, 219);
  }
  span {
    margin: 0px 15px;
    font-weight: 600;
    color: #8e8e8e;
  }
`;

function Separator() {
  return (
    <SSeparator>
      <div></div>
      <span>Or</span>
      <div></div>
    </SSeparator>
  );
}

export default Separator;
