import { NextResponse } from "next/server";
import { getCurrentSession } from "./session";


//Defining the public and protected routes for the project

const protectedRoutes = ['/Dashboard', '/Admin'];
const publicRoutes  = ['/Login', '/Register'];

export default async function proxy(request) {
    //checking if the current route is protected or public//
    const path = request.nextUrl.pathname;
    console.log(path);
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);


    //Get the session //
    const session = await getCurrentSession();
    console.log(session);

    //Redirect the user if they aren't authenticated //
    if(isProtectedRoute&& !session?.user.id){
        return NextResponse.redirect(new URL('/Login', request.nextUrl));
    }

    //Redirect to dashboard if the user is authenticated
    if(isPublicRoute && session?.user.id && !request.nextUrl.pathname.startswith("/dashboard")){
        return NextResponse.redirect(new URL('/Dashboard', request.nextUrl))
    }

    return NextResponse.next();
}

export const config = {
      matcher: [
    "/Dashboard/:path*",
    "/Admin/:path*",
    "/Login",
    "/Register",
  ],
}