-- CreateTable
CREATE TABLE "EducationalDetails" (
    "id" SERIAL NOT NULL,
    "facultyUuid" INTEGER NOT NULL,
    "university" VARCHAR(100) NOT NULL,
    "degree" VARCHAR(20) NOT NULL,
    "graduatedIn" INTEGER NOT NULL,

    CONSTRAINT "EducationalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchDetails" (
    "id" SERIAL NOT NULL,
    "facultyUuid" INTEGER NOT NULL,
    "specialization" TEXT[],
    "orcid" VARCHAR(255) NOT NULL,
    "scopus" VARCHAR(255) NOT NULL,
    "googleScholar" VARCHAR(255) NOT NULL,
    "hIndex" INTEGER NOT NULL,
    "i10Index" INTEGER NOT NULL,

    CONSTRAINT "ResearchDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatentPublishedDetails" (
    "id" SERIAL NOT NULL,
    "facultyUuid" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "applicationNumber" TEXT NOT NULL,

    CONSTRAINT "PatentPublishedDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "uuid" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "image" TEXT,
    "designation" VARCHAR(50) NOT NULL,
    "school" VARCHAR(80) NOT NULL,
    "department" VARCHAR(80) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResearchDetails_facultyUuid_key" ON "ResearchDetails"("facultyUuid");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_id_key" ON "Faculty"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_email_key" ON "Faculty"("email");

-- AddForeignKey
ALTER TABLE "EducationalDetails" ADD CONSTRAINT "EducationalDetails_facultyUuid_fkey" FOREIGN KEY ("facultyUuid") REFERENCES "Faculty"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchDetails" ADD CONSTRAINT "ResearchDetails_facultyUuid_fkey" FOREIGN KEY ("facultyUuid") REFERENCES "Faculty"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatentPublishedDetails" ADD CONSTRAINT "PatentPublishedDetails_facultyUuid_fkey" FOREIGN KEY ("facultyUuid") REFERENCES "Faculty"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
