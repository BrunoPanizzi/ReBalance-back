import UserRepository from '../Repositories/UserRepository'

import {
  NewUser,
  UpdateUser,
  newUserSchema,
  updateUserSchema,
  userSchema,
} from '../../schema'

import { encrypt } from '../hashing'

import { emailSchema, uuidSchema } from '../utils/schemas'

class UserService {
  async getAll() {
    return await UserRepository.getAll()
  }

  async getByUid(uid: string) {
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

    const encryptedPassword = await encrypt(parsedUser.password)

    const finalUser: NewUser = {
      ...parsedUser,
      password: encryptedPassword,
    }

    const [createdUser] = await UserRepository.create(finalUser)
    return createdUser
  }

  async update(uid: string, user: UpdateUser) {
    const parsedUid = uuidSchema.parse(uid)
    const parsedUser = updateUserSchema.parse(user)

    // don't overwrite the password please
    const partialUser = {
      email: parsedUser.email,
      userName: parsedUser.userName,
    }

    const [newUser] = await UserRepository.updateUser(parsedUid, partialUser)

    const parsedUpdatedUser = userSchema.parse(newUser)

    return parsedUpdatedUser
  }

  async deleteByUid(uid: string) {
    const parsedUid = uuidSchema.parse(uid)

    return await UserRepository.delete(parsedUid)
  }
}

export default new UserService()
