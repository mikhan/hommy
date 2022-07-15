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

async function createUser({
  name,
  username,
  password,
}: {
  name: string
  username: string
  password: string
}) {
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: { name },
  })

  console.log({ profile })

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
    where: { namespace: 'development' },
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

async function main() {
  const user = await createUser({
    name: 'Developer',
    username: 'root',
    password: 'root',
  })
  console.log({ user })

  const workspace = await createWorkspace({
    name: 'Development Workspace',
    namespace: 'development',
    user: user,
  })
  console.log({ workspace })

  const projects = ['Beverley Woods', 'Palm Springs', 'Hidden Hills']
  for (const name of projects) {
    const project = await createProject({ name, workspace })
    console.log({ project })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
