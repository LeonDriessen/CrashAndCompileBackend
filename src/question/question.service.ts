import { Injectable, NotFoundException } from '@nestjs/common';
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
      __v: quest.__v,
    }));
  }
  async insertQuestion(question: string, answer: string, points: number) {
    const newQuestion = new this.questionModel({
      question,
      answer,
      points,
    });
    const result = await newQuestion.save();
    return result.id as string;
  }

  async getSingleQuestion(questionId: string) {
    const question = await this.findQuestion(questionId);
    return {
      id: question.id,
      question: question.question,
      answer: question.answer,
      points: question.points,
      __v: question.__v,
    };
  }

  async deleteQuestion(questionId: string) {
    const result = await this.questionModel
      .deleteOne({ _id: questionId })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find product to delete.');
    }
  }

  async updateQuestion(
    questionId: string,
    question: string,
    answer: string,
    points: number,
  ) {
    const updatedQuestion = await this.findQuestion(questionId);
    if (question) {
      updatedQuestion.question = question;
    }
    if (answer) {
      updatedQuestion.answer = answer;
    }
    if (points) {
      updatedQuestion.points = points;
    }
    await updatedQuestion.save();
  }

  private async findQuestion(id: string): Promise<Question> {
    let question;
    try {
      question = await this.questionModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find the question.');
    }
    if (!question) {
      throw new NotFoundException('Could not find the question.');
    }
    return question;
  }
}
