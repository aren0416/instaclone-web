import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const WhiteBox = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
`;

const TopBox = styled(WhiteBox)`
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
    flex-direction: column;
    align-items: center;
    input {
      width: 100%;
      border-radius: 3px;
      padding: 7px;
      background-color: #fafafa;
      border: 0.5px solid rgb(219, 219, 219);
      margin-top: 5px;
      box-sizing: border-box;
      &::placeholder {
        font-size: 12px;
      }
      &:last-child {
        border: none;
        margin-top: 12px;
        background-color: #0095f6;
        color: white;
        text-align: center;
        font-weight: 600;
        font-size: 12px;
      }
    }
  }
`;

const Separator = styled.div`
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

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const BottomBox = styled(WhiteBox)`
  padding: 20px 0;
  text-align: center;
  a {
    font-weight: 600;
    color: #0095f6;
  }
`;

function Login() {
  return (
    <Container>
      <Wrapper>
        <TopBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <form>
            <input type="text" placeholder="전화번호, 사용자이름 또는 이메일" />
            <input type="password" placeholder="비밀번호" />
            <input type="submit" value="로그인" placeholder="로그인" />
          </form>

          <Separator>
            <div></div>
            <span>Or</span>
            <div></div>
          </Separator>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} />
            <span>페이스북으로 로그인</span>
          </FacebookLogin>
        </TopBox>
        <BottomBox>
          <span>계정이 없으신가요?</span>
          <a href="#">가입하기</a>
        </BottomBox>
      </Wrapper>
    </Container>
  );
}

export default Login;
