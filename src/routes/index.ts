import { Router } from 'express'

import UserController from '../Controllers/UserController'
import WalletController from '../Controllers/WalletController'

const router = Router()

// USER
router.get('/user', UserController.index)
router.get('/user/:uid', UserController.show)
router.post('/user', UserController.store)
router.post('/user/:uid', UserController.update)
router.delete('/user/:uid', UserController.delete)

// WALLETS
router.get('/user/:uid/wallet', WalletController.index)
router.get('/user/:uid/wallet/:walletId', WalletController.show)
router.post('/user/:uid/wallet', WalletController.store)
router.post('/user/:uid/wallet/:walletId', WalletController.update)
router.delete('/user/:uid/wallet/:walletId', WalletController.delete)

export default router
