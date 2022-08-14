import { Injectable } from '@nestjs/common'
import { CredentialType, User, Workspace, Project, Gender } from '@prisma/client'
import { DatabaseService } from '../../apps/hommy/api/src/app/core/services/database.service'
import { generateSalt, hashPassword } from '../../apps/hommy/api/src/app/session/utils/password-credential'
import { Seed } from './data'

@Injectable()
export class SeedService {
  constructor(private db: DatabaseService) {}

  init(DATA: Seed) {
    return this.db.$transaction(async () => {
      for (const user of DATA.users) {
      }
      const user = await this.createUser({
        name: 'John',
        lastname: 'Developer',
        gender: Gender.MALE,
        username: 'root',
        password: 'root',
      })

      for (const { name, namespace, projects } of DATA.workspaces) {
        const workspace = await this.createWorkspace({
          name,
          namespace,
          user,
        })

        for (const { name, residentes } of projects) {
          const project = await this.createProject({ name, workspace })

          for (const { profile } of residentes) {
            await this.createNeighbor(project, workspace, user, profile)
          }
        }
      }
    })
  }

  async createNeighbor(
    project: Project,
    workspace: Workspace,
    user: User,
    profile: { name: string; lastname: string; gender: Gender },
  ) {
    await this.db.neighbor.create({
      data: {
        projectId: project.id,
        workspaceId: workspace.id,
        name: `${profile.name} ${profile.lastname}`,
        profile: {
          create: {
            name: profile.name,
            lastname: profile.lastname,
            gender: profile.gender,
          },
        },
        capturedById: user.id,
      },
    })
  }

  async createProfile({ name, lastname, gender }: { name: string; lastname: string; gender: Gender }) {
    return await this.db.profile.create({
      data: { name, lastname, gender },
    })
  }

  async createUser({
    name,
    lastname,
    gender,
    username,
    password,
  }: {
    name: string
    lastname: string
    gender: Gender
    username: string
    password: string
  }) {
    const profile = await this.createProfile({ name, lastname, gender })
    const salt = generateSalt()
    const hash = hashPassword(password, salt)

    return await this.db.user.create({
      data: {
        active: true,
        capturedById: 1,
        profileId: profile.id,
        credentials: {
          create: [
            {
              credentialType: CredentialType.PASSWORD,
              username: username,
              payload: { salt, hash },
            },
          ],
        },
      },
    })
  }

  async createWorkspace({ name, namespace, user }: { name: string; namespace: string; user: User }) {
    return await this.db.workspace.upsert({
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

  async createProject({ name, workspace }: { name: string; workspace: Workspace }) {
    return await this.db.project.create({
      data: {
        name,
        workspaceId: workspace.id,
      },
    })
  }
}
