"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { sidbaarLinks } from "@/data/SiedbaarLinks";
import { UserSection } from "./UserSection";
import clsx from "clsx";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export const SideBaar = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="flex flex-col h-full w-64 bg-white shadow-md p-4">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="bg-[#38593F] rounded-lg w-20 h-20 flex  flex-col items-center justify-center">
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

        <h1 className="mt-4 text-2xl font-bold text-[#38593F]">YardLink</h1>
      </div>

      {/* Links */}
      <nav className="flex-1 flex flex-col gap-2">
        {sidbaarLinks.map((link) => {
          const isActive =
            link.href === "/admin/users"
              ? pathname === link.href || pathname.startsWith(`${link.href}/`)
              : pathname === link.href;
          console.log(
            "Link:",
            link.label,
            "isActive:",
            isActive,
            "pathname:",
            pathname,
            "link.href:",
            link.href
          );
          if (link.dropdown) {
            const isOpen = openDropdown === link.label;
            return (
              <div key={link.label} className="flex flex-col">
                {/* Dropdown Trigger */}
                <div
                  onClick={() => toggleDropdown(link.label)}
                  className={clsx(
                    "flex items-center gap-2 p-2 rounded-md cursor-pointer select-none",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </div>

                {/* Dropdown Content */}
                {/* {isOpen && (
                  <div className="flex flex-col ml-6 mt-1 gap-1">
                    {link.dropdown.map((sublink) => {
                      const isSublinkActive = pathname === sublink.href;
                      return (
                        <Link
                          key={sublink.label}
                          href={sublink.href}
                          className={clsx(
                            "flex items-center gap-2 p-2 rounded-md text-sm",
                            isSublinkActive
                              ? "bg-primary/8 border border-primary"
                              : "hover:bg-gray-100"
                          )}
                        >
                          <sublink.icon className="w-4 h-4" />
                          {sublink.label}f
                        </Link>
                      );
                    })}
                  </div>
                )} */}

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="flex flex-col ml-6 mt-1 gap-1 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {link.dropdown.map((sublink) => {
                        const isSublinkActive = pathname === sublink.href;
                        return (
                          <Link
                            key={sublink.label}
                            href={sublink.href}
                            className={clsx(
                              "flex items-center gap-2 p-2 rounded-md text-sm",
                              isSublinkActive
                                ? "bg-primary/8 border border-primary"
                                : "hover:bg-gray-100"
                            )}
                          >
                            <sublink.icon className="w-4 h-4" />
                            {sublink.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <Link
              key={link.label}
              href={link.href}
              className={clsx(
                "flex items-center gap-2 p-2 rounded-md cursor-pointer",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="mt-auto">
        <UserSection />
      </div>
    </div>
  );
};
