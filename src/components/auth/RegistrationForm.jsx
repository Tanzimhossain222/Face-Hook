import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import Field from "../common/Field";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  const submitForm = async (formData) => {
    try {
      let response = await axiosInstance.post("/auth/register", formData);

      if (response.status !== 201) {
        throw new Error("An error occurred");
      }

      toast.success("Registration successful", {
        position: "top-right",
        autoClose: 600,
      });

      // Redirect to login page after 1 second
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 1200,
      });

      setError("root.random", {
        type: "random",
        message: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="first Name" htmlFor="email" error={errors.firstName}>
        <input
          className={`auth-input ${!!errors.firstName ? "border-red-500" : ""}`}
          type="text"
          id="firstName"
          name="firstName"
          {...register("firstName", {
            required: "firstName is required",
          })}
        />
      </Field>

      <Field label="last Name" htmlFor="email" error={errors.lastName}>
        <input
          className={`auth-input ${!!errors.lastName ? "border-red-500" : ""}`}
          type="text"
          id="lastName"
          name="lastName"
          {...register("lastName")}
        />
      </Field>

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
          className={`auth-input ${!!errors.password ? "border-red-500" : ""}`}
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

      {errors?.root?.random?.message && (
        <p>
          <span className="text-red-500 text-sm">
            {errors?.root?.random?.message}
          </span>
        </p>
      )}

      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
