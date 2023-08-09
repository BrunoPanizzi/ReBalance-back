import { Router } from 'express'

import UserController from '../Controllers/UserController'
import WalletController from '../Controllers/WalletController'
import AuthController from '../Controllers/AuthController'
import StockController from '../Controllers/StockController'

import AuthMiddleware from '../middlewares/AuthMiddleware'
import ShoppingController from '../Controllers/ShoppingController'
import FeedbackController from '../Controllers/FeedbackController'

const router = Router()

// Feedbacks
router.get('/feedback', FeedbackController.index)
router.post('/feedback', FeedbackController.store)

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
router.get('/wallet/:walletId/stock', StockController.index) // show all the stocks for the specified wallet
router.get('/wallet/:walletId/stock/:stockId', StockController.show) // show the specified stock for the specified wallet if exists
router.post('/wallet/:walletId/stock', StockController.store) // create a new stock for the specified wallet
router.post('/wallet/:walletId/stock/:stockId', StockController.update) // update the specified stock for the specified wallet
router.delete('/wallet/:walletId/stock/:stockId', StockController.delete) // delete the specified stock for the specified wallet

router.get('/stock', StockController.indexByUser) // show all the socks for the logged user
router.get('/stock/ticker/:ticker', StockController.showByTicker) // show the specified stock for the logged user if exists, joined with the wallet it belongs to
router.post('/stock', StockController.updateMany) // update multiple stocks, all wallets

router.post('/shopping', ShoppingController.all) // returns the ideal purchases for each wallet
router.post('/shopping/:walletId') // returns the ideal purchases for the stocks in the specified wallet

export default router
