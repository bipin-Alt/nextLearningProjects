"use client"
import Link from "next/link";
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

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
import { HandleRegistration } from "@/lib/actions/Auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { togglePasswordShow } from "@/lib/features/uiSlice/uiSlice";



export default function Register() {
  const dispatch = useDispatch();
  const showPassword = useSelector(state=> state.ui.showPassword);
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-sm">

        {/* Header */}
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>

          <CardDescription>
            Enter your information below to create your account.
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent>
          <form className="space-y-6" action={HandleRegistration}>

            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword?"text":"password"}
                  placeholder="Enter your password"
                  required
                />
                <button
                  onClick={()=>{dispatch(togglePasswordShow())}}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {
                    showPassword ? <FaEyeSlash  className="h-4 w-4"/> : <FaEye className="h-4 w-4" />
                  }
                  
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">
                Confirm Password
              </Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword?"text":"password"}
                  placeholder="Confirm your password"
                  required
                />
                 <button
                  onClick={()=>{dispatch(togglePasswordShow())}}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {
                    showPassword ? <FaEyeSlash  className="h-4 w-4"/> : <FaEye className="h-4 w-4" />
                  }
                  
                </button>
              </div>
            </div>

            {/* Register */}
            <Button type="submit" className="w-full">
              Register
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

          {/* GitHub */}
          <Button
            type="button"
            variant="outline"
            className="mt-3 w-full"
          >
            <FaGithub className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
        </CardContent>

        {/* Footer */}
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/Login"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Login
            </Link>
          </p>
        </CardFooter>

      </Card>
    </div>
  );
}