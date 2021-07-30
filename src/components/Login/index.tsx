/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useLazyQuery } from "@apollo/client";
import { UserQuery } from "../../graphql/queries/user";

type FormValues = {
  email: string;
  password: string;
};

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required().min(5),
});

const Login = (): JSX.Element => {
  const [getToken, { data }] = useLazyQuery(UserQuery);
  if (data) {
    localStorage.setItem("token", data.user);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: joiResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    getToken({ variables: { input } });
    reset();
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="votre adresse email"
          {...register("email")}
        />
        <input
          type="password"
          placeholder="votre mot de passe"
          {...register("password")}
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
