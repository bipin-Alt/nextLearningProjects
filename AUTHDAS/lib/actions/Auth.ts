"use server";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import { createSession, destroySession } from "../session";
import { redirect } from "next/navigation";
import{z} from "zod"

//Register schema using zod //
const RegisterSchema = z.object({
  name:z.string().min(1, "Name is required"),
  email:z.email("Invalid email address"),
  password:z.string()
  .min(6,"Password must be atleast more than 6 characters"),
  //.regex(/[A-Z]/, "Password must contain atleast a Uppercase letter")
  //.regex(/[a-z]/,"Password must contain atleast a lowercase letter")
  //.regex(/[0-9]/,"Password must contain")
  //.regex(/[^A-Za-z0-9]/, "Password must contain atleast a special character(eg: &,@,$....)"),

  confirmPassword: z.string(),
}).refine((data)=> data.password === data.confirmPassword,{ 
   message:"Password didn't match",
   path:["confirmPassword"]
});

//Registration function
export async function HandleRegistration(formData: FormData) {
  try {
    //userDataFromForm converted to js object from a messy raw data//
    const userDataFromForm = Object.fromEntries(formData); 
    const result = RegisterSchema.safeParse(userDataFromForm); // using safeparse to tell zod  avoid throw an error  instead it returns an object//
     // result returns like this return { success: true or false, error}  
    if(!result.success){ // if the result success property is falsy//
        return {
          status:400,
          message: result.error.issues[0].message
        }
      }

    const{name, email, password} = result.data;
    
 
   const existingUser = await prisma.user.findUnique({   //checking if the user already exists 
    where :{email},
   });
   
  // checking if the user with same email exists already
   if(existingUser){
    console.log("Your Account exists already login to access it.")
    return {
      status : 409 ,
      message : "User already exists please login to access your account",
    }
   };
    
   // hashing the password entered by the user
   const hashedPassword = await bcrypt.hash(password,10);
   //save the data to the database
   
   const newUser = await prisma.user.create({   //creating an user with the credentials
    data:{
      email: email,
      password:hashedPassword,
      name: name
    }
   });
    console.log("New User Created Successfully", newUser);
   return {
    status : 200,
    message: "Your account has been created successfully",
    data:{userId: newUser.id}
   }
  
  } catch (e) {
    console.log("REGISTRATION ERROR :", e);
    return {
      status:500,
      message:"Something went wrong!try again later"
    }
  }
}

const loginSchema = z.object({
  email: z.string("Invalid Email Address"),
  password:z.string()
});
// Login Authentication Function
export async function HandleLogin(formData: FormData) {
const userLoginDataForm = Object.fromEntries(formData);  
const result = loginSchema.safeParse(userLoginDataForm); // match the user input to the login schema//
  if(!result.success){
    console.log(result.error.issues[0].message);
    return{
      status:400,
      message: result.error.issues[0].message
    }
  }

const {email, password} = result.data;

  // find the user with the email that is unique
  const user = await prisma.user.findUnique({
    where:{email}
  })

  //if there isn't any user//
  if(!user){
   console.log("Can't find the user");
    return {
      status:401,
      message:"Invalid email or password",
    }
  }

  console.log(user);
 //compare the password entered and the hased password 
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(isPasswordValid);
  //check if the password is invalid
  if(!isPasswordValid){
    return {
      status : 401,
      message:"Invalid email or password"
    } 
  }
  //if the password is valid then we then create a session for it //
  await createSession(user.id);

  if(user.role === "ADMIN") {
    redirect("/Admin");
  }else{
    redirect("/Dashboard");
  }
  
}
// This function handles logout when the user logs out of the current session
export async function handleLogout(){
  await destroySession();
  redirect("/Login")
}