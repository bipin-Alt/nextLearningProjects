"use server";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import { createSession, destroySession } from "../session";
import { redirect } from "next/navigation";



//Registration function
export async function HandleRegistration(formData) {
  try {
    //selecting elements
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword")

    if (!email || !password) {  //checking if the email and password is empty
      return { status:400, message:"Please enter your credentials!! "};
    }

   const existingUser = await prisma.user.findUnique({   //checking if the user already exists 
    where :{email},
   });

   //for form validation of the passwords didn't match 
   if(password !== confirmPassword) {
    return {
      status:400,
      message:"confirm password should match  to your password."
    }
   }

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

// Login Authentication Function
export async function HandleLogin(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  //check if the email and password//
  if(!email || !password) {
    return {
      status:400,
      message:"Please enter the email and password",
    }
  }
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