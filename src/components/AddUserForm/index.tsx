/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Path, useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import "./password.css";
import { CreateUser } from "../../graphql/mutations/user";

type IFormValues = {
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  password: string;
};

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  type?: string;
};

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  firstname: Joi.string().required().trim(),
  lastname: Joi.string().required().trim(),
  avatar: Joi.string().trim().optional().allow(""),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-!@#$%^&*]).{8,}$/)
    .message(
      "Le mot de passe doit contenir au moins 8 caractères, au moins 1 nombre et au moins 1 caractère spécial"
    ),
});

const Input = ({ label, register, required, type }: InputProps) => (
  <div className="flex flex-col space-y-1">
    <label className="text-white">{label}</label>
    <input
      type={type}
      {...register(label, { required })}
      className="text-white border-none rounded px-3 py-2 w-full focus:outline-none focus:ring-main-red focus:ring-2 focus:shadow bg-pressed shadow-channels"
    />
  </div>
);

const AddUser = (): JSX.Element => {
  const history = useHistory();
  const [mutationError, setMutationError] = useState("");
  const [addUser] = useMutation(CreateUser, {
    onError: (error) => {
      setMutationError(error.message);
    },
    onCompleted: () => {
      setMutationError("");
      history.push("/community");
    },
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ resolver: joiResolver(schema) });

  const onSubmit: SubmitHandler<IFormValues> = (input) => {
    addUser({ variables: { input } });
    reset();
  };

  return (
    <div className="w-1/2 mx-auto mt-5 shadow-mainnav p-4">
      {mutationError !== "" ? mutationError : null}
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <Input label="email" register={register} required />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <Input label="firstname" register={register} required />
        {errors.firstname && (
          <span className="text-red-500">{errors.firstname.message}</span>
        )}
        <Input label="lastname" register={register} required />
        {errors.lastname && (
          <span className="text-red-500">{errors.lastname.message}</span>
        )}
        <Input label="avatar" register={register} required={false} />
        {errors.avatar && (
          <span className="text-red-500">{errors.avatar.message}</span>
        )}
        <div className="relative">
          <Input
            type={passwordShown ? "text" : "password"}
            label="password"
            register={register}
            required={false}
          />
          {passwordShown && (
            <EyeOff
              onClick={togglePasswordVisibility}
              className="absolute bottom-2 right-6 text-white"
            />
          )}
          <Eye
            onClick={togglePasswordVisibility}
            className="absolute bottom-2 right-6 text-white"
          />
        </div>

        {errors.password && (
          <span className="text-red-500">{errors.password?.message}</span>
        )}
        <div className="text-center">
          <input
            type="submit"
            className="btn bg-workit text-white py-3 px-4 rounded border-none mt-5 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
