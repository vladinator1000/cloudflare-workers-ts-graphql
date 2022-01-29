-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('Bronze', 'Silver', 'Gold');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscriptionPlanId" INTEGER;

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" SERIAL NOT NULL,
    "tier" "SubscriptionTier" NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
