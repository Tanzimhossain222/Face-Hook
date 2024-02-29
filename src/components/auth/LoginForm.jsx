import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../hooks/useAuth";
import Field from "../common/Field";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const submitForm = async (formData) => {
    try {
      const response = await axiosInstance.post("/auth/login", formData);

      if (response.status !== 200) {
        throw new Error("An error occurred");
      }

      const { token, user } = response.data;

      if (token) {
        const authToken = token.token;
        const refreshToken = token.refreshToken;

        setAuth({ user, authToken, refreshToken });
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 1000,
        });

        // Redirect to home page after 1 second
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} does not exist or password is incorrect. Please try again.`,
      });
    }
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

        <p>
          <span className="text-red-500 text-sm">
            {errors?.root?.random?.message}
          </span>
        </p>

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
