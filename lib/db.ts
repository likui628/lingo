import {PrismaClient} from "@prisma/client"
import {Prisma} from ".prisma/client"

let opt: Prisma.PrismaClientOptions = {}
if (process.env.NODE_ENV === "development") {
  opt["log"] = ["query", "info", "warn", "error"]
}

export const prisma = new PrismaClient(opt)
