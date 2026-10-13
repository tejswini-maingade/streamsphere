-- CreateEnum
CREATE TYPE "Role" AS ENUM ('VIEWER', 'CREATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('UPLOADING', 'PROCESSING', 'READY', 'FAILED');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('QUEUED', 'RUNNING', 'SUCCEEDED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'VIEWER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "sourceKey" TEXT,
    "playbackKey" TEXT,
    "thumbnailKey" TEXT,
    "durationSeconds" INTEGER,
    "status" "VideoStatus" NOT NULL DEFAULT 'UPLOADING',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessingJob" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'QUEUED',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcessingJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "videoId" INTEGER NOT NULL,
    "progressSeconds" INTEGER NOT NULL DEFAULT 0,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Video_category_idx" ON "Video"("category");

-- CreateIndex
CREATE INDEX "Video_creatorId_idx" ON "Video"("creatorId");

-- CreateIndex
CREATE INDEX "Video_published_status_idx" ON "Video"("published", "status");

-- CreateIndex
CREATE INDEX "ProcessingJob_status_idx" ON "ProcessingJob"("status");

-- CreateIndex
CREATE UNIQUE INDEX "WatchHistory_userId_videoId_key" ON "WatchHistory"("userId", "videoId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessingJob" ADD CONSTRAINT "ProcessingJob_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchHistory" ADD CONSTRAINT "WatchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchHistory" ADD CONSTRAINT "WatchHistory_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
