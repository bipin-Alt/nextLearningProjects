"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { HandleLogin } from "@/lib/actions/Auth";
import { useDispatch } from "react-redux";
import { togglePasswordShow } from "@/lib/features/uiSlice/uiSlice";
import { useSelector } from "react-redux";



export default function Login() {

const dispatch = useDispatch();
const viewPassword = useSelector((state)=> state.ui.showPassword);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Welcome back
          </CardTitle>

          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" action={HandleLogin}>
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Input
                  name="password"
                  id="password"
                  type= {viewPassword? "text":"password"}
                  required
                />
                <button
                onClick={()=>{dispatch(togglePasswordShow())}}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                 { 
                   viewPassword ?
                  <FaEye className="h-4 w-4" /> : <FaEyeSlash className="h-4 w-4"/>
                }
                </button>
              </div>
            </div>

            {/* Login */}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          {/* OR Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />

            <span className="text-xs font-medium text-muted-foreground">
              OR
            </span>

            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Google */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
          >
            <FaGoogle className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            className="mt-3 w-full"
          >
            <FaGithub className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Does not have an account?
            <Link
              href="/Register"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}