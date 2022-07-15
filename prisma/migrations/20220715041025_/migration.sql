-- CreateEnum
CREATE TYPE "CredentialTypeEnum" AS ENUM ('PASSWORD');

-- CreateTable
CREATE TABLE "Credential" (
    "userId" INTEGER NOT NULL,
    "credentialType" "CredentialTypeEnum" NOT NULL,
    "username" TEXT NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("credentialType","username")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL,
    "profileId" INTEGER NOT NULL,
    "capturedDate" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "capturedById" INTEGER NOT NULL,
    "modifiedDate" TIMESTAMP(3),
    "modifiedById" INTEGER,
    "deletedDate" TIMESTAMP(3),
    "deletedById" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "workspaceId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "namespace" VARCHAR(128) NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToWorkspace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_key" ON "User"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_namespace_key" ON "Workspace"("namespace");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToWorkspace_AB_unique" ON "_UserToWorkspace"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToWorkspace_B_index" ON "_UserToWorkspace"("B");

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_capturedById_fkey" FOREIGN KEY ("capturedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_modifiedById_fkey" FOREIGN KEY ("modifiedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorkspace" ADD CONSTRAINT "_UserToWorkspace_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorkspace" ADD CONSTRAINT "_UserToWorkspace_B_fkey" FOREIGN KEY ("B") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
