import { Router } from 'express'

import UserController from '../Controllers/UserController'

const router = Router()

// USER
router.get('/user', UserController.index)
router.get('/user/:uid', UserController.show)
router.post('/user', UserController.store)
router.post('/user/:uid', UserController.update)
router.delete('/user/:uid', UserController.delete)

export default router
