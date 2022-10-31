-- AlterTable
ALTER TABLE "Faculty" ALTER COLUMN "postDoctoralExperience" DROP NOT NULL,
ALTER COLUMN "consultancyProjectDetails" SET DEFAULT ARRAY[]::JSONB[],
ALTER COLUMN "completedConsultancyProjectDetails" SET DEFAULT ARRAY[]::JSONB[],
ALTER COLUMN "ongoingFundedProjectDetails" SET DEFAULT ARRAY[]::JSONB[],
ALTER COLUMN "completedFundedProjectDetails" SET DEFAULT ARRAY[]::JSONB[],
ALTER COLUMN "patentPublishedDetails" SET DEFAULT ARRAY[]::JSONB[],
ALTER COLUMN "patentGrantedDetails" SET DEFAULT ARRAY[]::JSONB[],
ALTER COLUMN "bookPublishedDetails" SET DEFAULT ARRAY[]::JSONB[],
ALTER COLUMN "awardDetails" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "majorInternationalCollaborationsDetails" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "majorIndustryCollaborationsDetails" SET DEFAULT ARRAY[]::TEXT[];
