import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"; 
export const FloatingInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isActive = isFocused || value.length > 0;
  const isPassword = type === "password";

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          id={id}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 pt-5 pb-2 text-base border-b  outline-none  transition-colors duration-200 bg-white
            ${error ? "border-red-500" : isFocused ? "border-[#38593F]" : "border-gray-300"}
            ${isPassword ? "pr-12" : ""}`}
        />
        <motion.label
          htmlFor={id}
          initial={false}
          animate={{
            y: isActive ? -12 : 0,
            scale: isActive ? 0.85 : 1,
            color: error ? "#ef4444" : isActive ? "#38593F" : "#9ca3af",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-4 top-1/2 -translate-y-1/2 origin-left pointer-events-none bg-white px-1"
        >
          {label}
        </motion.label>
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};