"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Pencil } from "lucide-react";
import Image from "next/image";

interface ProfileData {
  fullName: string;
  email: string;
  role: string;
  phoneNumber: string;
  profileImage: string | null;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const FloatingInput = ({
  id, label, type = "text", value, onChange, error, disabled = false,
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; disabled?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          id={id} type={type} value={value} onChange={onChange} disabled={disabled}
          onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
          className={`w-full px-4 pt-5 pb-2 text-sm border rounded-lg outline-none transition-colors duration-200
            ${error ? "border-red-500" : isFocused && !disabled ? "border-[#38593F]" : "border-gray-300"}
            ${disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "bg-white"}`}
        />
        <motion.label
          htmlFor={id} initial={false}
          animate={{ y: isActive ? -12 : 0, scale: isActive ? 0.85 : 1, color: error ? "#ef4444" : isActive ? (disabled ? "#9ca3af" : "#38593F") : "#9ca3af" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-4 top-1/2 -translate-y-1/2 origin-left pointer-events-none bg-inherit px-1"
          style={{ backgroundColor: disabled ? "#f9fafb" : "white" }}
        >
          {label}
        </motion.label>
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 ml-1">
          {error}
        </motion.p>
      )}
    </div>
  );
};

const getInitialColor = (name: string): string => {
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"];
  return colors[name.charCodeAt(0) % colors.length];
};

const EditButton = ({ onClick, isEditing }: { onClick: () => void; isEditing: boolean }) => (
  <AnimatePresence>
    {!isEditing && (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
        onClick={onClick}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-[#38593F]"
      >
        <Pencil size={18} />
      </motion.button>
    )}
  </AnimatePresence>
);

const ActionButtons = ({ isEditing, isLoading, onCancel, saveLabel = "Save" }: { isEditing: boolean; isLoading: boolean; onCancel: () => void; saveLabel?: string }) => (
  <AnimatePresence>
    {isEditing && (
      <motion.div
        initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -10, height: 0 }}
        transition={{ duration: 0.3 }} className="flex justify-center gap-3 overflow-hidden"
      >
        <motion.button type="button" onClick={onCancel} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="px-6 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
          Cancel
        </motion.button>
        <motion.button type="submit" disabled={isLoading} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="px-6 py-2 bg-[#38bdf8] text-white rounded-lg hover:bg-[#0ea5e9] transition-colors disabled:opacity-70">
          {isLoading ? `${saveLabel.replace("Save", "Saving").replace("Update", "Updating")}...` : saveLabel}
        </motion.button>
      </motion.div>
    )}
  </AnimatePresence>
);

const ProfileAvatar = ({ name, image, onImageChange, disabled }: { name: string; image: string | null; onImageChange: (file: File) => void; disabled: boolean }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initial = name.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {image ? (
          <Image src={image} alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-blue-500" height={80} width={80} />
        ) : (
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-blue-500"  style={{ backgroundColor: getInitialColor(name) }}>
            {initial}
          </div>
        )}
        <AnimatePresence>
          {!disabled && (
            <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
              type="button" onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border hover:bg-gray-50 transition-colors">
              <Camera size={14} className="text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {!disabled && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            type="button" onClick={() => fileInputRef.current?.click()} className="text-blue-500 text-sm hover:underline">
            Choose Photo
          </motion.button>
        )}
      </AnimatePresence>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onImageChange(e.target.files[0])} />
    </div>
  );
};

export const ProfileSettings = () => {
  const initialProfileData: ProfileData = { fullName: "Alex David", email: "alex.david@example.com", role: "Admin", phoneNumber: "+9876754321", profileImage: null };
  const initialPasswordData: PasswordData = { currentPassword: "", newPassword: "", confirmPassword: "" };

  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [passwordData, setPasswordData] = useState<PasswordData>(initialPasswordData);
  const [profileErrors, setProfileErrors] = useState<FormErrors>({});
  const [passwordErrors, setPasswordErrors] = useState<FormErrors>({});
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [savedProfileData, setSavedProfileData] = useState<ProfileData>(initialProfileData);

  const validateProfile = (): boolean => {
    const errors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;

    if (!profileData.fullName.trim()) errors.fullName = "Full name is required";
    else if (profileData.fullName.trim().length < 2) errors.fullName = "Name must be at least 2 characters";
    if (!profileData.email.trim()) errors.email = "Email is required";
    else if (!emailRegex.test(profileData.email)) errors.email = "Please enter a valid email";
    if (!profileData.phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
    else if (!phoneRegex.test(profileData.phoneNumber)) errors.phoneNumber = "Please enter a valid phone number";

    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = (): boolean => {
    const errors: FormErrors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordData.currentPassword) errors.currentPassword = "Current password is required";
    if (!passwordData.newPassword) errors.newPassword = "New password is required";
    else if (!passwordRegex.test(passwordData.newPassword)) errors.newPassword = "Min 8 chars with uppercase, lowercase, number & symbol";
    if (!passwordData.confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (passwordData.newPassword !== passwordData.confirmPassword) errors.confirmPassword = "Passwords do not match";

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileChange = (field: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData((prev) => ({ ...prev, [field]: e.target.value }));
    if (profileErrors[field]) setProfileErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePasswordChange = (field: keyof PasswordData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData((prev) => ({ ...prev, [field]: e.target.value }));
    if (passwordErrors[field]) setPasswordErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setProfileData((prev) => ({ ...prev, profileImage: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProfile()) return;
    setIsProfileSaving(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSavedProfileData(profileData);
    setIsProfileEditing(false);
    setIsProfileSaving(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) return;
    setIsPasswordUpdating(true);
    await new Promise((r) => setTimeout(r, 1500));
    setPasswordData(initialPasswordData);
    setIsPasswordEditing(false);
    setIsPasswordUpdating(false);
  };

  const handleProfileCancel = () => {
    setProfileData(savedProfileData);
    setProfileErrors({});
    setIsProfileEditing(false);
  };

  const handlePasswordCancel = () => {
    setPasswordData(initialPasswordData);
    setPasswordErrors({});
    setIsPasswordEditing(false);
  };

  return (
    <div className=" p-6 space-y-6">
      {/* Profile Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
            <p className="text-sm text-gray-500">Update your personal information and profile picture</p>
          </div>
          <EditButton onClick={() => setIsProfileEditing(true)} isEditing={isProfileEditing} />
        </div>

        <form onSubmit={handleProfileSubmit}>
          <div className="flex flex-col items-center mb-8">
            <ProfileAvatar name={profileData.fullName} image={profileData.profileImage} onImageChange={handleImageChange} disabled={!isProfileEditing} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <FloatingInput id="fullName" label="Full Name" value={profileData.fullName} onChange={handleProfileChange("fullName")} error={profileErrors.fullName} disabled={!isProfileEditing} />
            <FloatingInput id="email" label="Email Address" type="email" value={profileData.email} onChange={handleProfileChange("email")} error={profileErrors.email} disabled />
            <FloatingInput id="role" label="Role" value={profileData.role} onChange={handleProfileChange("role")} disabled />
            <FloatingInput id="phone" label="Phone Number" value={profileData.phoneNumber} onChange={handleProfileChange("phoneNumber")} error={profileErrors.phoneNumber} disabled={!isProfileEditing} />
          </div>

          <ActionButtons isEditing={isProfileEditing} isLoading={isProfileSaving} onCancel={handleProfileCancel} saveLabel="Save" />
        </form>
      </motion.div>

      {/* Password Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
            <p className="text-sm text-gray-500">Password must be at least 8 characters including symbols and numbers</p>
          </div>
          <EditButton onClick={() => setIsPasswordEditing(true)} isEditing={isPasswordEditing} />
        </div>

        <form onSubmit={handlePasswordSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <FloatingInput id="currentPassword" label="Current password" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange("currentPassword")} error={passwordErrors.currentPassword} disabled={!isPasswordEditing} />
            <FloatingInput id="newPassword" label="New password" type="password" value={passwordData.newPassword} onChange={handlePasswordChange("newPassword")} error={passwordErrors.newPassword} disabled={!isPasswordEditing} />
            <FloatingInput id="confirmPassword" label="Confirm New password" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange("confirmPassword")} error={passwordErrors.confirmPassword} disabled={!isPasswordEditing} />
          </div>

          <ActionButtons isEditing={isPasswordEditing} isLoading={isPasswordUpdating} onCancel={handlePasswordCancel} saveLabel="Update" />
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileSettings;