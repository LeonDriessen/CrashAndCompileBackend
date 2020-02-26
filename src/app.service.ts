import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Question } from './app.model';

@Injectable()
export class AppService {
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
