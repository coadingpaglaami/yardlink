"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { FloatingInput } from "./FloatingInput";
import { useLoginMutation } from "@/hooks"; // Adjust path as needed
import { useRouter } from "next/navigation";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const router = useRouter();
  const loginMutation = useLoginMutation();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    loginMutation.mutate(formData, {
      onSuccess: () => {
        // Tokens are already saved in onSuccess of useLoginMutation (setTokens)
        // Redirect to dashboard or home page
        router.push("/admin"); // Change this to your desired route, e.g., "/admin", "/"
      },
      onError: (error) => {
        // Handle API errors (e.g., wrong credentials)
        const message =
          (axios.isAxiosError(error) && error.response?.data?.message) ||
          (error instanceof Error && error.message) ||
          "Invalid email or password. Please try again.";

        setErrors({ password: message }); // Show error under password field
      },
    });
  };

  const isLoading = loginMutation.isPending; // TanStack Query v5 uses isPending

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{ background: "url(/auth/authbg.jpg)", backgroundSize: "cover" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 flex flex-col items-center justify-center gap-3 rounded-lg max-w-lg w-full mx-4 shadow-xl"
      >
        <div className="flex flex-col items-center">
          <div className="bg-[#38593F] rounded-lg w-20 h-20 flex flex-col items-center justify-center">
            <Image
              src="/sidebaar/logo.svg"
              alt="logo"
              height={100}
              width={100}
              className="w-10 h-10"
            />
            <span className="mt-2 text-white text-sm font-semibold">
              YardLink
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#38593F]">YardLink</h1>
        </div>

        <span className="md:text-5xl text-3xl font-bold text-gray-800">
          Login
        </span>
        <span className="text-gray-500">Welcome to Admin</span>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 mt-2"
        >
          <FloatingInput
            id="email"
            label="Email"
            type="text"
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
          />

          <FloatingInput
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange("password")}
            error={errors.password}
          />

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block"
                />
                Logging in...
              </span>
            ) : (
              "Log in"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
