/* eslint-disable jsx-a11y/label-has-associated-control */
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

import { ReactComponent as WorkitLogo } from "../../assets/IT.svg";

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
    localStorage.setItem("email", input.email);
    reset();
  };

  const inputStyle = "rounded-md p-2 mb-8";
  const labelStyle = "mb-2 text-main-white";

  return (
    <div className="h-screen m-auto">
      <div className="pt-4">
        <div className="rounded-full grid place-items-center bg-circle m-auto shadow-profile w-64 h-64">
          <div className="m-auto grid place-items-center rounded-full bg-workit w-60 h-60">
            <div className="m-auto grid place-items-center rounded-full bg-main-darkgrey w-52 h-52">
              <WorkitLogo className="m-auto w-44 h-44" />
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label htmlFor="mail" className={labelStyle}>
          e-mail
        </label>
        <input
          className={inputStyle}
          type="email"
          placeholder="votre adresse email"
          {...register("email")}
        />
        <label htmlFor="password" className={labelStyle}>
          password
        </label>
        <input
          className={inputStyle}
          type="password"
          placeholder="votre mot de passe"
          {...register("password")}
        />
        <button type="submit" className="text-main-white">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
