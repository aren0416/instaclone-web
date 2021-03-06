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
              required: "???????????? ??????????????????",
              minLength: {
                value: 5,
                message: "???????????? 5??? ?????? ???????????? ?????????.",
              },
              //pattern: ""
              //validate: (currentValue) => currentValue.includes("potato"),
            })}
            onChange={clearLoginError}
            name="username"
            type="text"
            placeholder="????????????, ??????????????? ?????? ?????????"
            hasError={Boolean(errors?.username?.message)}
          />
          {/* {errors?.username?.message} */}
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "??????????????? ??????????????????",
            })}
            onChange={clearLoginError}
            name="password"
            type="password"
            placeholder="????????????"
            hasError={Boolean(errors?.password?.message)}
          />
          {/* {errors?.password?.message} */}
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "?????????..." : "?????????"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>

        <Separator />

        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>?????????????????? ?????????</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta={"????????? ????????????????"}
        link={routes.signUp}
        linkText="????????????"
      />
    </AuthLayout>
  );
}

export default Login;
