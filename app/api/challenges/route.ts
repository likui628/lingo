import {prisma} from "@/lib/db";
import {isAdmin} from "@/lib/queries";
import {NextRequest, NextResponse} from "next/server";

export const GET = async () => {
  const admin = await isAdmin()
  if (!admin) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }
  const data = await prisma.challenge.findMany()
  return NextResponse.json(data)
}

export const POST = async (req: NextRequest) => {
  const admin = await isAdmin()
  if (!admin) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }

  const body = await req.json()
  const data = await prisma.challenge.create({
    data: {
      ...body
    }
  })
  return NextResponse.json(data)
}