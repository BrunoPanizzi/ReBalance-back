import { eq, and } from 'drizzle-orm'
import { NewWallet, UpdateWallet, wallet } from '../../schema'
import db from '../db'

const matchUidAndWid = (uid: string, walletId: string) =>
  and(eq(wallet.owner, uid), eq(wallet.id, walletId))

class WalletRepository {
  getAll(uid: string) {
    return db.query.wallet.findMany({
      where: (wallet, { eq }) => eq(wallet.owner, uid),
    })
  }

  getById(uid: string, walletId: string) {
    return db.query.wallet.findFirst({
      where: matchUidAndWid(uid, walletId),
    })
  }

  getByTitle(uid: string, title: string) {
    return db.query.wallet.findFirst({
      where: (wallet, { and, eq }) =>
        and(eq(wallet.owner, uid), eq(wallet.title, title)),
    })
  }

  create(w: NewWallet) {
    return db.insert(wallet).values(w).returning()
  }

  update(uid: string, walletId: string, w: UpdateWallet) {
    return db
      .update(wallet)
      .set(w)
      .where(matchUidAndWid(uid, walletId))
      .returning()
  }

  deleteById(uid: string, walletId: string) {
    return db.delete(wallet).where(matchUidAndWid(uid, walletId)).returning()
  }
}

export default new WalletRepository()
