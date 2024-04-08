import {prisma} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {isAdmin} from "@/lib/queries";

export const GET = async (_req: NextRequest, {params}: { params: { lessonId: string } }) => {
  const data = await prisma.lesson.findUnique({
    where: {
      id: params.lessonId
    }
  })
  return NextResponse.json(data)
}

export const PUT = async (req: NextRequest, {params}: { params: { lessonId: string } }) => {
  const admin = await isAdmin()
  if (!admin) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }

  const body = await req.json()
  const data = await prisma.lesson.update({
    where: {
      id: params.lessonId
    },
    data: {
      ...body
    }
  })
  return NextResponse.json(data)
}

export const DELETE = async (_req: NextRequest, {params}: { params: { lessonId: string } }) => {
  const admin = await isAdmin()
  if (!admin) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }

  const data = await prisma.lesson.delete({
    where: {
      id: params.lessonId
    }
  })
  return NextResponse.json(data)
}