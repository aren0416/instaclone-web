import { useMutation } from "@apollo/client";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import routes from "../routes";
import AuthLayout from "./components/Auth/AuthLayout";
import BottomBox from "./components/Auth/BottomBox";
import Button from "./components/Auth/Button";
import FormBox from "./components/Auth/FormBox";
import FormError from "./components/Auth/FormError";
import Input from "./components/Auth/Input";
import Separator from "./components/Auth/Separator";
import PageTitle from "./components/PageTitle";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return null;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "아이디를 입력해주세요",
              minLength: {
                value: 5,
                message: "아이디는 5자 이상 작성해야 됩니다.",
              },
              //pattern: ""
              //validate: (currentValue) => currentValue.includes("potato"),
            })}
            onChange={clearLoginError}
            name="username"
            type="text"
            placeholder="전화번호, 사용자이름 또는 이메일"
            hasError={Boolean(errors?.username?.message)}
          />
          {/* {errors?.username?.message} */}
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "비밀번호를 입력해주세요",
            })}
            onChange={clearLoginError}
            name="password"
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
          />
          {/* {errors?.password?.message} */}
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "로딩중..." : "로그인"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>

        <Separator />

        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>페이스북으로 로그인</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta={"계정이 없으신가요?"}
        link={routes.signUp}
        linkText="가입하기"
      />
    </AuthLayout>
  );
}

export default Login;
