/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useHistory } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useLazyQuery } from "@apollo/client";
import LoginQuery from "../../graphql/queries/login";

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

const Login = ({ setLogged }: any): JSX.Element => {
  const history = useHistory();

  const [getToken, { data }] = useLazyQuery(LoginQuery, {
    onCompleted: (data) => {
      if (data.login.token) {
        localStorage.setItem("token", data.login.token);
        setLogged(true);
        history.push("/");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: joiResolver(schema),
    defaultValues: { email: "alicia@gmail.com", password: "Azerty123" },
  });

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    getToken({
      variables: { input },
    });
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
