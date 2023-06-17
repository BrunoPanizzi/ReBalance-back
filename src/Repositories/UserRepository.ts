import { eq } from 'drizzle-orm'
import { user, type NewUser, type UpdateUser } from '../../schema'

import db from '../db'

const fields = {
  userName: user.userName,
  email: user.email,
  uid: user.uid,
}

class UserRepository {
  getAll() {
    return db.select(fields).from(user)
  }

  getByUid(uid: string) {
    return db.select(fields).from(user).where(eq(user.uid, uid))
  }

  getByEmail(email: string) {
    return db.select(fields).from(user).where(eq(user.email, email))
  }

  create(u: NewUser) {
    return db.insert(user).values(u).returning(fields)
  }

  updateUser(uid: string, u: UpdateUser) {
    return db.update(user).set(u).where(eq(user.uid, uid)).returning(fields)
  }

  delete(uid: string) {
    return db.delete(user).where(eq(user.uid, uid)).returning(fields)
  }
}

export default new UserRepository()
