import { Feedback, NewFeedback, feedback } from '../../schema'
import db from '../db'

class FeedbackRepository {
  findAll(): Promise<Feedback[]> {
    return db.select().from(feedback)
  }

  async create(newFeedback: NewFeedback): Promise<Feedback> {
    return (await db.insert(feedback).values(newFeedback).returning())[0]
  }
}

export default new FeedbackRepository()
