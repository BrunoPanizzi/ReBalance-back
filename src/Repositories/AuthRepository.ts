import db from '../db'

class AuthRepository {
  getUserByEmail(email: string) {
    return db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    })
  }
}

export default new AuthRepository()
