import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/db";
import {isAdmin} from "@/lib/queries";

export const GET = async (req: NextRequest, {params}: { params: { challengeId: string } }) => {
  const data = await prisma.challenge.findUnique({
    where: {
      id: params.challengeId
    }
  })
  return NextResponse.json(data)
}

export const PUT = async (req: NextRequest, {params}: { params: { challengeId: string } }) => {
  const admin = await isAdmin()
  if (!admin) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }
  
  const body = await req.json()
  const data = await prisma.challenge.update({
    where: {
      id: params.challengeId
    },
    data: {
      ...body
    }
  })
  return NextResponse.json(data)
}

export const DELETE = async (req: NextRequest, {params}: { params: { challengeId: string } }) => {
  const admin = await isAdmin()
  if (!admin) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }
  const data = await prisma.challenge.delete({
    where: {
      id: params.challengeId
    }
  })
  return NextResponse.json(data)
}