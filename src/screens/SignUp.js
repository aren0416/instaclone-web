import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "./components/Auth/AuthLayout";
import BottomBox from "./components/Auth/BottomBox";
import Button from "./components/Auth/Button";
import FormBox from "./components/Auth/FormBox";
import Input from "./components/Auth/Input";
import Separator from "./components/Auth/Separator";
import PageTitle from "./components/PageTitle";
import { FatLink } from "./components/shared";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
  line-height: 22px;
`;

function SignUp() {
  return (
    <AuthLayout>
      <PageTitle title="SignUp" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>친구들의 사진과 동영상을 보려면 가입하세요.</Subtitle>
        </HeaderContainer>
        <form>
          <Input type="text" placeholder="휴대폰 번호 또는 이메일 주소" />
          <Input type="text" placeholder="성명" />
          <Input type="text" placeholder="사용자 이름" />
          <Input type="password" placeholder="비밀번호" />
          <Button type="submit" value="가입하기" />
        </form>
      </FormBox>
      <BottomBox
        cta={"계정이 있으신가요?"}
        link={routes.home}
        linkText="로그인"
      />
    </AuthLayout>
  );
}

export default SignUp;
