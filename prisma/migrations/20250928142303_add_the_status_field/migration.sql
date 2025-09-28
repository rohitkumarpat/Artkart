-- CreateEnum
CREATE TYPE "public"."check" AS ENUM ('pending', 'deliver');

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "status" "public"."check" DEFAULT 'pending';
