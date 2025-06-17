"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/hooks/useLogin";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginPageProps {
  onLogin: (email: string, password: string) => boolean;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "yona@example.com",
      password: "12345678",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isRobot, setIsRobot] = useState(false);
  const {
    login,
    isLogggingIn,
    isSuccess,
    isError,
    data: loginData,
    error: loginError,
  } = useLogin();
  const router = useRouter();

  const onSubmit = (data: LoginFormInputs) => {
    login(data);
  };
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (accessToken) {
      toast.success("welcome Back!");
      router.replace("/dashboard");
    }
  }, []);
  if (accessToken) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 bg-[url('/img/admin-bg.svg')]">
      {/* {isLogggingIn && <Loader />} */}
      <div className="w-full max-w-xl grid bg-white rounded-lg overflow-hidden shadow-xl">
        <div className="p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-xl text-blue-600 font-medium">
              Welcome to 888Market
            </h2>
            <h1 className="text-2xl font-bold mt-2">Login To Admin</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Email Address"
                className={`${
                  errors.email ? "border-red-500 focus:ring-red-500" : ""
                }`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className={`${
                    errors.password ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="border border-gray-300 rounded-md p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="robot"
                  checked={isRobot}
                  onCheckedChange={(checked) => setIsRobot(checked as boolean)}
                />
                <label
                  htmlFor="robot"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I'm not a robot
                </label>
                <div className="ml-auto flex flex-col items-center">
                  <Image
                    src="/img/recaptcha.png"
                    alt="recaptcha"
                    width={30}
                    height={30}
                  />
                  <div className="mt-1 flex flex-col items-center">
                    <span className="text-[10px] text-gray-500">Recaptcha</span>
                    <span className="text-[10px] text-gray-500">
                      Privacy-Terms
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {(loginError || isError) && (
              <div className="text-red-500 text-sm">
                {loginError?.message || "Login failed. Please try again."}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLogggingIn ? (
                <div className="flex justify-center items-center w-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              ) : (
                <span>Login</span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}


export default LoginPage;
