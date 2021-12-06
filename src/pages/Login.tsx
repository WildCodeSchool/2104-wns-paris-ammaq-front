/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import Joi from "joi";
import Rive from "rive-react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { ArrowRight, Eye, EyeOff } from "react-feather";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useLazyQuery } from "@apollo/client";
import { useAuth } from "../context/auth-provider";
import LoginQuery from "../graphql/queries/login";

import { ReactComponent as Workit } from "../assets/workitwhite.svg";
import AnimationLogo from "../assets/logo_workit_animation.riv";

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
  const { setToken } = useAuth();

  const [getToken] = useLazyQuery(LoginQuery, {
    onCompleted: (data) => {
      if (data.login.token) {
        localStorage.setItem("token", data.login.token);
        setToken(jwt_decode(data.login.token));
        history.replace("/");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { register, handleSubmit, reset } = useForm<FormValues>({
    resolver: joiResolver(schema),
    defaultValues: { email: "alicia@gmail.com", password: "Azerty123" },
  });

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    getToken({
      variables: { input },
    });
    reset();
  };

  const toggleVisibility = () => {
    setShown(!shown);
  };

  const inputStyle =
    "rounded-md p-2 mb-8 h-10 bg-main-darkgrey text-main-white shadow-pressed focus:outline-none focus:border-main-orange focus:border-solid focus:border-2";
  const labelStyle = "mb-2 text-transparent bg-workit bg-clip-text";
  const eyeStyle = "absolute w-4 right-2 top-2 text-main-orange";

  return (
    <>
      <Workit className="w-28 absolute right-2 -bottom-16" />
      <div className="h-screen m-auto grid place-items-center">
        <div className="shadow-mainnav p-10 rounded-lg">
          <div className="pt-4">
            <Rive src={AnimationLogo} className="w-52 h-52" />
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
