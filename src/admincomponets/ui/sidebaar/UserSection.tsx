"use client";

import { useState } from "react";
import { UserIcon, ChevronDown, UserCogIcon, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const UserSection = () => {
  const [user] = useState({ name: "Hasan", photo: "" }); // server can pass props if needed
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
        {user.photo ? (
          <Image src={user.photo} width={100} height={100} className="w-8 h-8 rounded-full" alt="user" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
            {user.name[0]}
          </div>
        )}
        <span className="flex-1">{user.name}</span>
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        <DropdownMenuItem className="flex items-center gap-2 border-b border-gray-200" onClick={() => router.push('/admin/profile')}>
          <UserCogIcon className="w-4 h-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <LogOut className="w-4 h-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
