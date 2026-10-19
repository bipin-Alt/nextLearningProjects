import {cookies} from "next/headers";
import crypto from "crypto";
import { prisma } from "./prisma";


const SESSION_COOKIE_NAME = "session_id";
//This function is responsible for hashing the session token because even if the database is leaked then the hashed session will found//
function hashSessionToken ( token ){
    return crypto.createHash("sha256").update(token).digest("hex");
}

//Function that cleans up the database  or that will delete the expired session information whenever a new session is requested by that account.
async function cleanExpiredSessions(){
    await prisma.session.deleteMany({
   where :{
    expiresAt :{
        lt : new Date(),
    },
   }
    });
};

 
// Function to create a new session
export async function createSession(userId){
  //wait for expired sessions to be deleted//
     await cleanExpiredSessions();
    //Generate a random secure session token
    const sessionToken = crypto.randomBytes(32).toString("hex");
    // Set the session expiration time (2 days from now)
    const expiresAt = new Date(Date.now() + 3*24*60*60*1000); 
    
    const newSession= await prisma.session.create({
       data :{
        tokenHash : hashSessionToken(sessionToken),
        userId : userId,
        expiresAt: expiresAt,
       }
    })
    if(!newSession){
        console.log("SomeThing went wrong");
    }
 console.log("Session Created Successfully", newSession);


 //storing the session token in a secure cookie httpOnly

 const cookieStore = await cookies();
 cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly:true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path :'/',
 });
}

export async function getCurrentSession(){
    const cookieStore = await cookies();    
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

     if(!token) return null;

     const session = await prisma.session.findUnique({
        where : {
            tokenHash : hashSessionToken(token)
        },
        select : {
            id : true,
            userId : true,
            expiresAt :true,
            user: {
                select:{
                    id:true,
                    email:true,
                    name:true,
                    role:true
                }
            }
        }
     });

     if(!session){
        return null;
    }
    // check if the expiration time of the session passed the current time  If yes then delete those session checking evertime in the request ie login//
    if(session.expiresAt <= new Date()) {
        await prisma.session.deleteMany({
            where :{id:session.id},
        });
        cookieStore.delete(SESSION_COOKIE_NAME);
        return null;
    }

    return { user: session.user}
}

// This is the function that destory the session
export async function destroySession(){
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    try{
     if(token){
        await prisma.session.deleteMany({ // I have use delete many because it doesn't throws error if the record doesn't exists like delete
            where:{
                tokenHash : hashSessionToken(token)
            },

        })
    }
    }finally {
         cookieStore.delete(SESSION_COOKIE_NAME);
    }
   
}