import { Request, Response } from 'express'

import FeedbackService from '../Services/FeedbackService'

// I really hope that I need to implement pagination here
class FeedbackController {
  async index(req: Request, res: Response) {
    try {
      const feedback = await FeedbackService.findAll()

      return res.status(200).json(feedback)
    } catch (e) {
      console.log('something went wrong on FeedbackController.index', e)
      return res.sendStatus(400)
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { type, message, userName, email } = req.body

      const feedback = await FeedbackService.create({
        type,
        message,
        userName,
        email,
      })

      return res.status(201).json(feedback)
    } catch (e) {
      console.log('something went wrong on FeedbackController.create', e)
      return res.sendStatus(400)
    }
  }
}

export default new FeedbackController()
