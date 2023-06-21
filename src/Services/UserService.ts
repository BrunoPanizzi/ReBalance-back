import UserRepository from '../Repositories/UserRepository'

import {
  NewUser,
  UpdateUser,
  newUserSchema,
  updateUserSchema,
  userSchema,
} from '../../schema'

import { encryptPassword } from '../hashing'

import { emailSchema, uuidSchema } from '../utils/schemas'

class UserService {
  async getByUid(uid: string | undefined) {
    const parsedUid = uuidSchema.parse(uid)

    const [user] = await UserRepository.getByUid(parsedUid)

    const parsedUser = userSchema.parse(user)

    return parsedUser
  }

  async getByEmail(email: string) {
    const parsedEmail = emailSchema.parse(email)

    const [user] = await UserRepository.getByEmail(parsedEmail)

    const parsedUser = userSchema.parse(user)

    return parsedUser
  }

  async create(user: NewUser) {
    const parsedUser: NewUser = newUserSchema.parse(user)

    const [sameEmail] = await UserRepository.getByEmail(user.email)

    if (sameEmail) {
      throw new Error('Email already in use')
    }

    const encryptedPassword = await encryptPassword(parsedUser.password)

    const finalUser: NewUser = {
      ...parsedUser,
      password: encryptedPassword,
    }

    const [createdUser] = await UserRepository.create(finalUser)
    return createdUser
  }

  async update(uid: string | undefined, user: UpdateUser) {
    const parsedUid = uuidSchema.parse(uid)
    const parsedUser = updateUserSchema.parse(user) // this does not have password, so a password change route might be needed

    const [newUser] = await UserRepository.updateUser(parsedUid, parsedUser)

    const parsedUpdatedUser = userSchema.parse(newUser)

    return parsedUpdatedUser
  }

  async deleteByUid(uid: string | undefined) {
    const parsedUid = uuidSchema.parse(uid)

    return await UserRepository.delete(parsedUid)
  }
}

export default new UserService()
