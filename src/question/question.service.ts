import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Question } from './question.model';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel('Question') private readonly questionModel: Model<Question>,
  ) {}

  async getQuestions() {
    const questions = await this.questionModel.find().exec();
    return questions.map(quest => ({
      id: quest.id,
      question: quest.question,
      answer: quest.answer,
      points: quest.points,
    }));
  }
}
