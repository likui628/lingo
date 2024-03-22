-- CreateTable
CREATE TABLE "user_progress" (
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL DEFAULT 'User',
    "userImageSrc" TEXT NOT NULL DEFAULT '/mascot.svg',
    "hearts" INTEGER NOT NULL DEFAULT 5,
    "points" INTEGER NOT NULL DEFAULT 0,
    "activeCourseId" TEXT,

    CONSTRAINT "user_progress_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_activeCourseId_fkey" FOREIGN KEY ("activeCourseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
