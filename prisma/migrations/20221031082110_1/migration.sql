-- CreateTable
CREATE TABLE "EducationalDetails" (
    "id" SERIAL NOT NULL,
    "facultyUuid" INTEGER NOT NULL,
    "degree" VARCHAR(20) NOT NULL,
    "university" VARCHAR(100) NOT NULL,
    "specialization" TEXT NOT NULL,
    "graduatedYear" TEXT NOT NULL,

    CONSTRAINT "EducationalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchDetails" (
    "facultyUuid" INTEGER NOT NULL,
    "specialization" TEXT[],
    "orcid" VARCHAR(255) NOT NULL,
    "scopus" VARCHAR(255) NOT NULL,
    "googleScholar" VARCHAR(255) NOT NULL,
    "hIndex" INTEGER NOT NULL,
    "i10Index" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Faculty" (
    "uuid" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "salutation" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "designation" VARCHAR(50) NOT NULL,
    "department" VARCHAR(80) NOT NULL,
    "school" VARCHAR(80) NOT NULL,
    "postDoctoralExperience" TEXT NOT NULL,
    "consultancyProjectDetails" JSONB[],
    "completedConsultancyProjectDetails" JSONB[],
    "ongoingFundedProjectDetails" JSONB[],
    "completedFundedProjectDetails" JSONB[],
    "patentPublishedDetails" JSONB[],
    "patentGrantedDetails" JSONB[],
    "bookPublishedDetails" JSONB[],
    "awardDetails" TEXT[],
    "majorInternationalCollaborationsDetails" TEXT[],
    "majorIndustryCollaborationsDetails" TEXT[],
    "editorialExperience" TEXT,
    "personalWebsite" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(50) NOT NULL,
    "username" TEXT NOT NULL,
    "password" VARCHAR(70) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResearchDetails_facultyUuid_key" ON "ResearchDetails"("facultyUuid");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_id_key" ON "Faculty"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_email_key" ON "Faculty"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_uuid_key" ON "Admin"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- AddForeignKey
ALTER TABLE "EducationalDetails" ADD CONSTRAINT "EducationalDetails_facultyUuid_fkey" FOREIGN KEY ("facultyUuid") REFERENCES "Faculty"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchDetails" ADD CONSTRAINT "ResearchDetails_facultyUuid_fkey" FOREIGN KEY ("facultyUuid") REFERENCES "Faculty"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
