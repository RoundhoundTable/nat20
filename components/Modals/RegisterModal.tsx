import { NextComponentType } from "next";
import { Input } from "../Input";
import Button from "../Button";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { gql } from "apollo-server-core";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Router from "next/router";
import { registerSchema } from "../../validation/Authentication";

interface RegisterForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterModal: NextComponentType = () => {
  const { signUp } = useAuth();
  const { form, onChange, submit, errors } = useForm<RegisterForm>({
    schema: registerSchema,
  });
  const [Register, { data }] = useMutation(
    gql`
      mutation Mutation($credentials: RegisterMutationInput!) {
        register(credentials: $credentials)
      }
    `
  );

  const registerWrapper = async () => {
    await Register({
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
        await signUp(data.register);
        Router.reload();
      }
    })();
  }, [data]);

  return (
    <div className="flex flex-col items-center gap-5 text-white">
      <p className="text-2xl font-bold uppercase text-primary-500">Register</p>
      <form
        method="POST"
        onSubmit={(ev: any) => submit({ ev, func: registerWrapper })}
      >
        <Input
          name="email"
          label="Email"
          type={"email"}
          onChange={onChange}
          error={errors?.email}
        />
        <Input
          name="username"
          label="Username"
          type={"text"}
          onChange={onChange}
          error={errors?.username}
        />
        <Input
          name="password"
          label="Password"
          type={"password"}
          onChange={onChange}
          error={errors?.password}
        />
        <Input
          name="confirmPassword"
          label="Confirm password"
          type={"password"}
          onChange={onChange}
          error={errors?.confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default RegisterModal;
