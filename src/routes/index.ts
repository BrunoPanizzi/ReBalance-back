import { Router } from 'express'

import UserController from '../Controllers/UserController'
import WalletController from '../Controllers/WalletController'
import AuthController from '../Controllers/AuthController'
import StockController from '../Controllers/StockController'

import AuthMiddleware from '../middlewares/AuthMiddleware'

const router = Router()

router.post('/auth', AuthController.authenticate)

// CREATE USER
router.post('/user', UserController.store)

router.use(AuthMiddleware)

// LOGGED USER
router.get('/user', UserController.show)
router.post('/user/edit', UserController.update)
router.delete('/user', UserController.delete)

// WALLETS (logged only)
router.get('/wallet', WalletController.index)
router.get('/wallet/:walletId', WalletController.show)
router.post('/wallet', WalletController.store)
router.post('/wallet/:walletId', WalletController.update)
router.delete('/wallet/:walletId', WalletController.delete)

// STOCKS (logged only)
router.get('/wallet/:walletId/stock', StockController.index)
router.get('/wallet/:walletId/stock/:ticker', StockController.show)
router.post('/wallet/:walletId/stock', StockController.store)
router.post('/wallet/:walletId/stock/:ticker', StockController.update)
router.delete('/wallet/:walletId/stock/:stockId', StockController.delete)

export default router
