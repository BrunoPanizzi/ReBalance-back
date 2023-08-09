import { NewFeedback, newFeedbackSchema } from '../../schema'
import FeedbackRepository from '../Repositories/FeedbackRepository'

class FeedbackService {
  async findAll() {
    return await FeedbackRepository.findAll()
  }

  async create(feedback: NewFeedback) {
    const parsedFeedback = newFeedbackSchema.parse(feedback)

    const created = await FeedbackRepository.create(parsedFeedback)

    return created
  }
}

export default new FeedbackService()
