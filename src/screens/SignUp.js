import { useMutation } from "@apollo/client";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "./components/Auth/AuthLayout";
import BottomBox from "./components/Auth/BottomBox";
import Button from "./components/Auth/Button";
import FormBox from "./components/Auth/FormBox";
import FormError from "./components/Auth/FormError";
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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const history = useHistory();
  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    history.push(routes.home);
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const {
    register,
    handleSubmit,
    formState,
    errors,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const clearSignUpError = () => {
    clearErrors("result");
  };

  const onSubmitVaild = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="SignUp" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>친구들의 사진과 동영상을 보려면 가입하세요.</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitVaild)}>
          <Input
            ref={register({
              required: "적어주세요",
            })}
            onChange={clearSignUpError}
            name="firstName"
            type="text"
            placeholder="이름"
            hasError={Boolean(errors?.firstName?.message)}
          />
          <FormError message={errors?.firstName?.message} />

          <Input ref={register} name="lastName" type="text" placeholder="성" />

          <Input
            ref={register({
              required: "적어주세요",
            })}
            onChange={clearSignUpError}
            name="username"
            type="text"
            placeholder="아이디"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />

          <Input
            ref={register({
              required: "적어주세요",
            })}
            onChange={clearSignUpError}
            name="email"
            type="text"
            placeholder="이메일"
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />

          <Input
            ref={register({
              required: "적어주세요",
            })}
            onChange={clearSignUpError}
            name="password"
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />

          <Button
            type="submit"
            value="가입하기"
            value={loading ? "로딩중..." : "로그인"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
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
