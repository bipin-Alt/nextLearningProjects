import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/DataAccessLayer";
import { prisma } from "@/lib/prisma";

interface updateName {
  name: string,
}

export async function PATCH(request: NextRequest)
{
  try{
  const session = await verifySession();
  const updates : updateName = await request.json();
  const { name } = updates;

  if(!name){
    return NextResponse.json({success:false, message:"Invalid userName",}, {status:401})
  }
  const updatedUser = await prisma.user.update({
    where:{
      id:session.id,
    },
    data:{
      name:name,
    }
  })
  return NextResponse.json({ success:true, message: "User Updated Successfully"},{status:200});
  }catch(error){
    return NextResponse.json({success:false, message:error},{status:500});
  }  
}