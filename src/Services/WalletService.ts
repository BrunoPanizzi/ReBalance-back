import {
  NewWallet,
  UpdateWallet,
  newWalletSchema,
  updateWalletSchema,
  walletSchema,
  walletWithStocksSchema,
} from '../../schema'
import WalletRepository from '../Repositories/WalletRepository'

import { uuidSchema } from '../utils/schemas'

class WalletService {
  async getAll(uid: string, withStocks: string = 'false') {
    const parsedUid = uuidSchema.parse(uid)

    const parsedWithStocks = withStocks === 'true'

    const wallets = await WalletRepository.getAll(parsedUid, parsedWithStocks)

    return wallets
  }

  async getById(uid: string, walletId: string, withStocks: string = 'false') {
    const parsedUid = uuidSchema.parse(uid)
    const parsedWalletId = uuidSchema.parse(walletId)

    const parsedWithStocks = withStocks === 'true'

    const wallet = await WalletRepository.getById(
      parsedUid,
      parsedWalletId,
      parsedWithStocks
    )

    if (parsedWithStocks) {
      return walletWithStocksSchema.parse(wallet)
    }

    return walletSchema.parse(wallet)
  }

  async create(uid: string, wallet: NewWallet) {
    const parsedUid = uuidSchema.parse(uid)
    const parsedWallet = newWalletSchema.parse({ ...wallet, owner: parsedUid })

    const sameTitle = await WalletRepository.getByTitle(
      parsedUid,
      parsedWallet.title
    )

    if (sameTitle) {
      throw new Error('Name already in use')
    }

    const [newWallet] = await WalletRepository.create(parsedWallet)

    const parsedNewWallet = walletSchema.parse(newWallet)

    return parsedNewWallet
  }

  async update(uid: string, walletId: string, wallet: UpdateWallet) {
    const parsedUid = uuidSchema.parse(uid)
    const parsedWalletId = uuidSchema.parse(walletId)
    const parsedWallet = updateWalletSchema.parse(wallet)

    const sameTitle = await WalletRepository.getByTitle(
      parsedUid,
      parsedWallet.title ?? ''
    )

    if (sameTitle) {
      throw new Error('Name already in use')
    }

    const [newWallet] = await WalletRepository.update(
      parsedUid,
      parsedWalletId,
      parsedWallet
    )

    const parsedNewWallet = walletSchema.parse(newWallet)

    return parsedNewWallet
  }

  async deleteById(uid: string, walletId: string) {
    const parsedUid = uuidSchema.parse(uid)
    const parsedWalletId = uuidSchema.parse(walletId)

    await WalletRepository.deleteById(parsedUid, parsedWalletId)
  }
}

export default new WalletService()
