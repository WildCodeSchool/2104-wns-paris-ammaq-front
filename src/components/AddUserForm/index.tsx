/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Path, useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

type IFormValues = {
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
};

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
};

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  avatar: Joi.string(),
});

const Input = ({ label, register, required }: InputProps) => (
  <div className="flex flex-col space-y-1">
    <label className="text-white">{label}</label>
    <input
      {...register(label, { required })}
      className="border-none rounded px-3 py-2 w-full focus:outline-none focus:ring-main-red focus:ring-2 focus:shadow bg-pressed shadow-channels"
    />
  </div>
);

const onSubmit: SubmitHandler<IFormValues> = (data) => console.log(data);

const AddUser = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ resolver: joiResolver(schema) });

  return (
    <div className="w-1/2 mx-auto mt-5 shadow-mainnav p-4">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <Input label="email" register={register} required />
        {errors.email && (
          <span className="text-red-500">Email is required</span>
        )}
        <Input label="firstname" register={register} required />
        {errors.firstname && (
          <span className="text-red-500">First name is required</span>
        )}
        <Input label="lastname" register={register} required />
        {errors.lastname && (
          <span className="text-red-500">Last name is required</span>
        )}
        <Input label="avatar" register={register} required={false} />
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
