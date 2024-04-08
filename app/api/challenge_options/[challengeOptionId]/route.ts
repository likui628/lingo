import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/db";
import {isAdmin} from "@/lib/queries";

export const GET = async (_req: NextRequest, {params}: { params: { challengeOptionId: string } }) => {
  const data = await prisma.challengeOption.findUnique({
    where: {
      id: params.challengeOptionId
    }
  })

  return NextResponse.json(data)
}

export const PUT = async (req: NextRequest, {params}: { params: { challengeOptionId: string } }) => {
  const admin = await isAdmin()
  if (!admin) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }

  const body = await req.json()
  const data = await prisma.challengeOption.update({
    where: {
      id: params.challengeOptionId
    },
    data: {
      ...body
    }
  })
  return NextResponse.json(data)
}

export const DELETE = async (_req: NextRequest, {params}: { params: { challengeOptionId: string } }) => {
  const admin = await isAdmin()
  if (!admin) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }
  const data = await prisma.challengeOption.delete({
    where: {
      id: params.challengeOptionId
    }
  })
  return NextResponse.json(data)
}