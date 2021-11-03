/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useLazyQuery } from "@apollo/client";
import { ArrowRight, Eye, EyeOff } from "react-feather";
import LoginQuery from "../../graphql/queries/login";

import { ReactComponent as ItLogo } from "../../assets/IT.svg";
import { ReactComponent as Workit } from "../../assets/workitwhite.svg";

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
  const [shown, setShown] = useState(false);
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

  const toggleVisibility = () => {
    setShown(!shown);
  };

  const inputStyle =
    "rounded-md p-2 mb-8 h-10 bg-main-darkgrey shadow-pressed focus:outline-none focus:border-main-orange text-main-white";
  const labelStyle = "mb-2 text-transparent bg-workit bg-clip-text";
  const eyeStyle = "absolute w-4 right-2 top-2 text-main-orange";

  return (
    <>
      <Workit className="w-28 absolute right-2 -bottom-16" />
      <div className="h-screen m-auto grid place-items-center">
        <div className="shadow-mainnav p-10 rounded-lg">
          <div className="pt-4">
            <div className="rounded-full grid place-items-center bg-circle m-auto shadow-profile w-52 h-52">
              <div className="m-auto grid place-items-center rounded-full bg-workit w-44 h-44">
                <div className="m-auto grid place-items-center rounded-full bg-main-darkgrey w-40 h-40">
                  <ItLogo className="m-auto w-28 h-28" />
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
            <div className={`relative ${inputStyle}`}>
              <input
                className="bg-main-darkgrey flex"
                type={shown ? "text" : "password"}
                placeholder="votre mot de passe"
                {...register("password")}
              />
              <button
                type="button"
                className="w-4 focus:outline-none"
                onClick={toggleVisibility}
              >
                {shown ? (
                  <Eye className={eyeStyle} />
                ) : (
                  <EyeOff className={eyeStyle} />
                )}
              </button>
            </div>

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
    </>
  );
};

export default Login;
