import {
  Credential,
  CredentialType,
  Gender,
  Profile,
  Project,
  User,
  Workspace,
} from '@prisma/client'

export interface ProfileSeed
  extends Pick<Profile, 'name' | 'gender' | 'lastname'> {}

export interface ResidenteSeed {
  profile: ProfileSeed
}

export interface ProjectSeed extends Pick<Project, 'name'> {
  residentes: ResidenteSeed[]
}

export interface WorkspaceSeed extends Pick<Workspace, 'name' | 'namespace'> {
  projects: ProjectSeed[]
}

export interface CredentialSeed
  extends Pick<Credential, 'credentialType' | 'username'> {
  password: string
}

export interface UserSeed {
  profile: ProfileSeed
  credentials: CredentialSeed[]
}

export interface Seed {
  users: UserSeed[]
  workspaces: WorkspaceSeed[]
}

export const seed: Seed = {
  users: [
    {
      profile: {
        name: 'John',
        lastname: 'Developer',
        gender: Gender.MALE,
      },
      credentials: [
        {
          credentialType: CredentialType.PASSWORD,
          username: 'root',
          password: 'root',
        },
      ],
    },
  ],
  workspaces: [
    {
      name: 'Development Workspace',
      namespace: 'development',
      projects: [
        {
          name: 'Beverley Rocks',
          residentes: [
            {
              profile: {
                name: 'Fred',
                lastname: 'Flintstone',
                gender: Gender.MALE,
              },
            },
            {
              profile: {
                name: 'Wilma',
                lastname: 'Flintstone',
                gender: Gender.FEMALE,
              },
            },
            {
              profile: {
                name: 'Pebbles',
                lastname: 'Flintstone',
                gender: Gender.FEMALE,
              },
            },
          ],
        },
        {
          name: 'Hight Springs',
          residentes: [
            {
              profile: {
                name: 'George',
                lastname: 'Jetson',
                gender: Gender.MALE,
              },
            },
            {
              profile: {
                name: 'Jane',
                lastname: 'Jetson',
                gender: Gender.FEMALE,
              },
            },
            {
              profile: {
                name: 'Judy',
                lastname: 'Jetson',
                gender: Gender.FEMALE,
              },
            },
            {
              profile: {
                name: 'Elroy',
                lastname: 'Jetson',
                gender: Gender.MALE,
              },
            },
          ],
        },
        {
          name: 'Mistery Hills',
          residentes: [
            {
              profile: {
                name: 'Fred',
                lastname: 'Jones',
                gender: Gender.MALE,
              },
            },
            {
              profile: {
                name: 'Daphne',
                lastname: 'Blake',
                gender: Gender.FEMALE,
              },
            },
            {
              profile: {
                name: 'Velma',
                lastname: 'Dinkley',
                gender: Gender.FEMALE,
              },
            },
            {
              profile: {
                name: 'Norville',
                lastname: 'Rogers',
                gender: Gender.MALE,
              },
            },
          ],
        },
      ],
    },
  ],
}
