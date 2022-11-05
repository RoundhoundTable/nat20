import { NextComponentType } from "next";
import { Input } from "../Input";
import Button from "../Button";
import { useEffect } from "react";
import Router from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "../../hooks/useForm";

interface LoginForm {
  email: string;
  password: string;
}

const LoginModal: NextComponentType = () => {
  const { signIn } = useAuth();
  const { form, onChange, errors, submit } = useForm<LoginForm>({});
  const [Login, { data }] = useMutation(
    gql`
      mutation Mutation($credentials: LoginMutationInput!) {
        login(credentials: $credentials)
      }
    `
  );

  const loginWrapper = async () => {
    await Login({
      variables: {
        credentials: {
          ...form,
        },
      },
    });
  };

  useEffect(() => {
    (async () => {
      if (data) {
        await signIn(data.login);
        Router.reload();
      }
    })();
  }, [data]);

  return (
    <div className="flex flex-col items-center gap-5 text-white">
      <p className="text-2xl font-bold uppercase text-primary-500">Login</p>
      <form
        method="POST"
        onSubmit={(ev: any) => submit({ ev, func: loginWrapper })}
      >
        <Input
          name="email"
          label="Email"
          type={"email"}
          onChange={onChange}
          error={{ message: errors?.email }}
        />
        <Input
          name="password"
          label="Password"
          type={"password"}
          onChange={onChange}
          error={{ message: errors?.password }}
        />
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
};

export default LoginModal;
