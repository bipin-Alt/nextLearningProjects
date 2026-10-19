import { cache } from "react";
import { getCurrentSession } from "./session";
import { redirect } from "next/navigation";

export const verifySession =  cache(async ()=>{
    const session = await getCurrentSession();
    console.log(session);

    if(!session?.user.id){
     redirect("/Login");
    }
   return { id : session.user.id, isAuth: true, name: session.user.name, email:session.user.email, role:session.user.role}
});

export const verifyAdmin = cache(async() =>{
    const session = await verifySession();

    if(session.role !== "ADMIN") {
     redirect("/Dashboard");
    }
    return session;
});