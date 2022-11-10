-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'FACULTY');

-- CreateTable
CREATE TABLE "Faculty" (
    "uuid" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "salutation" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "designation" VARCHAR(50) NOT NULL,
    "department" VARCHAR(80) NOT NULL,
    "school" VARCHAR(80) NOT NULL,
    "educationalDetails" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "postDoctoralExperience" TEXT,
    "researchDetails" JSONB NOT NULL,
    "ongoingConsultancyProjectDetails" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "completedConsultancyProjectDetails" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "ongoingFundedProjectDetails" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "completedFundedProjectDetails" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "patentPublishedDetails" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "patentGrantedDetails" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "bookPublishedDetails" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "awardDetails" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "majorInternationalCollaborationsDetails" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "majorIndustryCollaborationsDetails" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "editorialExperience" TEXT,
    "personalWebsite" TEXT,
    "password" VARCHAR(70) DEFAULT '',
    "role" "Role" NOT NULL DEFAULT 'FACULTY',
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_id_key" ON "Faculty"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_email_key" ON "Faculty"("email");
