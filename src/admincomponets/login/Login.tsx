'use client';
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { FloatingInput } from "./FloatingInput";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email or username is required";
    } else if (!emailRegex.test(formData.email) && formData.email.length < 3) {
      newErrors.email = "Please enter a valid email or username";
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
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
  };

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
        <div className="flex flex-col items-center ">
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
          <h1 className=" text-2xl font-bold text-[#38593F]">YardLink</h1>
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
            label="Email or User name"
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
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? (
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
