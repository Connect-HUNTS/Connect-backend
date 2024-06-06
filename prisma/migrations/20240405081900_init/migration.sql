
-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investor" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "country" TEXT NOT NULL,
    "investorType" TEXT NOT NULL,
    "website" TEXT,
    "contactInformation" TEXT NOT NULL,
    "investmentType" TEXT NOT NULL,
    "fundingRound" TEXT NOT NULL,
    "type" TEXT[],
    "minTicketSize" DOUBLE PRECISION NOT NULL,
    "maxTicketSize" DOUBLE PRECISION NOT NULL,
    "leadInvestor" BOOLEAN NOT NULL,
    "description" TEXT,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Startup" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mainFeatures" TEXT NOT NULL,
    "pitchDeckLink" TEXT,
    "pitchVideoLink" TEXT,
    "whitepaperLink" TEXT,
    "tokenomicsSource" TEXT,
    "raiseType" TEXT NOT NULL,
    "fundingRound" TEXT NOT NULL,
    "fundraisingGoal" DOUBLE PRECISION NOT NULL,
    "raisedToDate" DOUBLE PRECISION NOT NULL,
    "previousInvestors" TEXT,
    "notableCustomersPartners" TEXT,
    "tractionMetrics" TEXT,
    "teamLinkedInProfiles" TEXT,
    "socialMediaLinks" TEXT,
    "telegram" TEXT NOT NULL,
    "otherServicesNeeded" TEXT,
    "discoverySource" TEXT,

    CONSTRAINT "Startup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "country" TEXT,
    "description" TEXT,
    "websiteLink" TEXT,
    "links" TEXT[],
    "type" TEXT[],
    "proposals" TEXT[],
    "contactEmail" TEXT,
    "keyCases" TEXT,
    "contacts" TEXT[],

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_userId_key" ON "Investor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Startup_userId_key" ON "Startup"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_userId_key" ON "Partner"("userId");

-- AddForeignKey
ALTER TABLE "Investor" ADD CONSTRAINT "Investor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Startup" ADD CONSTRAINT "Startup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
