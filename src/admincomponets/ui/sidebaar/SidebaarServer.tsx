import { sidbaarLinks } from "@/data/SiedbaarLinks";
import { UserSection } from "./UserSection";
import Link from "next/link";
import Image from "next/image";

export const SideBaarServer = async({ pathname }: { pathname: string }) => {
  return (
    <div className="flex flex-col h-full w-64 bg-white shadow-md p-4">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="bg-[#38593F] rounded-lg w-16 h-16 flex items-center justify-center">
          <Image src="/sidebaar/logo.svg" alt="logo" height={100} width={100} className="w-10 h-10" />
        </div>
        <span className="mt-2 text-white font-bold">YardLink</span>
        <h1 className="mt-4 text-2xl font-bold text-[#38593F]">YardLink</h1>
      </div>

      {/* Links */}
      <nav className="flex-1 flex flex-col gap-2">
        {sidbaarLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

          if (link.dropdown) {
            // Render user dropdown link server-side (only the wrapper)
            return (
              <div key={link.label}>
                <div
                  className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                    isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </div>
                <div className="flex flex-col ml-6 mt-1 gap-1">
                  {link.dropdown.map((sublink) => {
                    const isSublinkActive = pathname === sublink.href;
                    return (
                      <Link
                        key={sublink.label}
                        href={sublink.href}
                        className={`flex items-center gap-2 p-2 rounded-md text-sm ${
                          isSublinkActive
                            ? "bg-primary/8 border border-primary"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <sublink.icon className="w-4 h-4" />
                        {sublink.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
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
