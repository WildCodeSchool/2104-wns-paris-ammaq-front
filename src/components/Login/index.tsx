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
import { ArrowRight } from "react-feather";
import LoginQuery from "../../graphql/queries/login";

import { ReactComponent as WorkitLogo } from "../../assets/IT.svg";

import "./login.css";

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
  const history = useHistory();

  const [getToken, { data }] = useLazyQuery(LoginQuery, {
    onCompleted: (data) => {
      if (data.login.token) {
        localStorage.setItem("token", data.login.token);
        history.replace("/");
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

  const inputStyle =
    "rounded-md p-2 mb-8 bg-main-darkgrey shadow-pressed focus:outline-none focus:border-main-orange text-main-white";
  const labelStyle = "mb-2 text-transparent bg-workit bg-clip-text";

  return (
    <div className="h-screen m-auto grid place-items-center">
      <div className="shadow-mainnav p-10 rounded-lg">
        <div className="pt-4">
          <div className="rounded-full grid place-items-center bg-circle m-auto shadow-profile w-52 h-52">
            <div className="m-auto grid place-items-center rounded-full bg-workit w-44 h-44">
              <div className="m-auto grid place-items-center rounded-full bg-main-darkgrey w-40 h-40">
                <WorkitLogo className="m-auto w-28 h-28" />
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
          <button
            type="submit"
            className="flex m-auto place-items-center text-main-white shadow-channels p-2 rounded-md font-extrabold focus:outline-none focus:shadow-pressed"
          >
            se connecter
            <div className="ml-2 w-6 h-6 grid place-items-center rounded-full bg-workit">
              <ArrowRight className="w-4 text-main-darkgrey" />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
