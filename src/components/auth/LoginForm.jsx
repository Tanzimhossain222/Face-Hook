import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Field from "../common/Field";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const submitForm = (formData) => {
    const data = { ...formData };

    setAuth({ user: data.email });
    navigate("/");
  };

  return (
    <>
      <form
        className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
        onSubmit={handleSubmit(submitForm)}
      >
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            className={`auth-input ${!!errors.email ? "border-red-500" : ""}`}
            type="email"
            id="email"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
          />
        </Field>

        <Field label="Password" htmlFor="password" error={errors.password}>
          <input
            className={`auth-input ${
              !!errors.password ? "border-red-500" : ""
            }`}
            type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
            id="password"
            name="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters long",
              },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&]).*$/,
                message:
                  "Password should contain at least one letter, one number, and one special character",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-xs text-gray-500 underline focus:outline-none cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"} password
          </button>
        </Field>

        <Field>
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Login
          </button>
        </Field>
      </form>
    </>
  );
};

export default LoginForm;
