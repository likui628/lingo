import {isAdmin} from "@/lib/queries";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/db";

export const GET = async (_req: NextRequest, {params}: { params: { courseId: string } }) => {
  const data = await prisma.course.findUnique({
    where: {
      id: params.courseId
    }
  })
  return NextResponse.json(data)
}

export const PUT = async (req: NextRequest, {params}: { params: { courseId: string } }) => {
  const admin = await isAdmin()
  if (!admin) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }

  const {title, imageSrc} = await req.json()
  const data = await prisma.course.update({
    where: {
      id: params.courseId
    },
    data: {
      title,
      imageSrc,
    }
  })
  return NextResponse.json(data)
}

export const DELETE = async (_req: NextRequest, {params}: { params: { courseId: string } }) => {
  const admin = await isAdmin()
  if (!admin) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }

  const data = await prisma.course.delete({
    where: {
      id: params.courseId
    }
  })
  return NextResponse.json(data)
}