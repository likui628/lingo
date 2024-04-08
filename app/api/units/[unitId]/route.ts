import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/db";
import {isAdmin} from "@/lib/queries";

export const GET = async (_req: NextRequest, {params}: { params: { unitId: string } }) => {
  const data = await prisma.unit.findUnique({
    where: {
      id: params.unitId
    }
  })
  return NextResponse.json(data)
}

export const PUT = async (req: NextRequest, {params}: { params: { unitId: string } }) => {
  const admin = await isAdmin()
  if (!admin) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }

  const body = await req.json()
  const data = await prisma.unit.update({
    where: {
      id: params.unitId
    },
    data: {
      ...body
    }
  })
  return NextResponse.json(data)
}

export const DELETE = async (_req: NextRequest, {params}: { params: { unitId: string } }) => {
  const admin = await isAdmin()
  if (!admin) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }

  const data = await prisma.unit.delete({
    where: {
      id: params.unitId
    }
  })
  return NextResponse.json(data)
}