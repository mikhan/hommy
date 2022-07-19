import {
  CredentialTypeEnum,
  PrismaClient,
  User,
  Workspace,
} from '@prisma/client'
import {
  generateSalt,
  hashPassword,
} from '../apps/hommy/api/src/app/session/utils/password-credential'

const prisma = new PrismaClient()

async function createProfile({
  name,
  lastname,
}: {
  name: string
  lastname: string
}) {
  return await prisma.profile.create({
    data: { name, lastname },
  })
}

async function createUser({
  name,
  lastname,
  username,
  password,
}: {
  name: string
  lastname: string
  username: string
  password: string
}) {
  const profile = await createProfile({ name, lastname })
  const salt = generateSalt()
  const hash = hashPassword(password, salt)

  return await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      active: true,
      capturedById: 1,
      profileId: profile.id,
      credentials: {
        create: {
          credentialType: CredentialTypeEnum.PASSWORD,
          username: username,
          payload: { salt, hash },
        },
      },
    },
  })
}

async function createWorkspace({
  name,
  namespace,
  user,
}: {
  name: string
  namespace: string
  user: User
}) {
  return await prisma.workspace.upsert({
    where: { namespace },
    update: {},
    create: {
      name,
      namespace,
      ownerId: user.id,
      users: { connect: [{ id: user.id }] },
    },
  })
}

async function createProject({
  name,
  workspace,
}: {
  name: string
  workspace: Workspace
}) {
  return await prisma.project.create({
    data: {
      name,
      workspaceId: workspace.id,
    },
  })
}

const DATA = {
  workspace: {
    name: 'Development Workspace',
    namespace: 'development',
    projects: [
      {
        name: 'Beverley Rocks',
        residentes: [
          { name: 'Fred', lastname: 'Flintstone' },
          { name: 'Wilma', lastname: 'Flintstone' },
          { name: 'Pebbles', lastname: 'Flintstone' },
        ],
      },
      {
        name: 'Hight Springs',
        residentes: [
          { name: 'George', lastname: 'Jetson' },
          { name: 'Jane', lastname: 'Jetson' },
          { name: 'Judy', lastname: 'Jetson' },
          { name: 'Elroy', lastname: 'Jetson' },
        ],
      },
      {
        name: 'Mistery Hills',
        residentes: [
          { name: 'Fred', lastname: 'Jones' },
          { name: 'Daphne', lastname: 'Blake' },
          { name: 'Velma', lastname: 'Dinkley' },
          { name: 'Norville', lastname: 'Rogers' },
        ],
      },
    ],
  },
}

async function main() {
  const user = await createUser({
    name: 'John',
    lastname: 'Developer',
    username: 'root',
    password: 'root',
  })

  const workspace = await createWorkspace({
    name: DATA.workspace.name,
    namespace: DATA.workspace.namespace,
    user: user,
  })

  for (const { name, residentes } of DATA.workspace.projects) {
    const project = await createProject({ name, workspace })

    for (const { name, lastname } of residentes) {
      await prisma.neighbor.create({
        data: {
          projectId: project.id,
          workspaceId: workspace.id,
          name: `${name} ${lastname}`,
          profile: { create: { name, lastname } },
          capturedById: user.id,
        },
      })
    }
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
