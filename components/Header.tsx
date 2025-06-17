import React from "react";
import { toast } from "sonner";
import { Bell, ChevronDown, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useLogin } from "@/hooks/useLogin";
import Image from "next/image";

function Header() {
  const { isLogggingIn, data } = useLogin();

  function handleBell() {
    toast.success("Welcome to 888Market");
  }

  return (
    <header className="flex items-center justify-end p-4 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <Search size={20} />
        </button>
        <button
          className="p-2 text-gray-500 hover:text-gray-700 relative"
          onClick={handleBell}
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <Image
            className="w-10 h-10 rounded-full"
            src="/logo.jpg"
            width={10}
            height={10}
            alt="logo"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
