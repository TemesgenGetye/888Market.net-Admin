"use client";

import { usePathname } from "next/navigation";
import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";
import Loader from "./Loader";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.includes("login");
  const { loading, authenticated } = useAuthBootstrap();

  // console.log(loading, authenticated, isAuthPage);

  if (loading) return <Loader />;

  if (!authenticated && !isAuthPage) {
    return null;
  }

  return <>{children}</>;
}
