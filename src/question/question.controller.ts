import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getQuestions() {
    const Questions = await this.questionService.getQuestions();
    return Questions;
  }

  @Post()
  async addQuestion(
    @Body('question') bodQuestion: string,
    @Body('answer') bodAnswer: string,
    @Body('points') bodPoints: number,
  ) {
    const generatedId = await this.questionService.insertQuestion(
      bodQuestion,
      bodAnswer,
      bodPoints,
    );
    return { id: generatedId };
  }

  @Get(':id')
  getQuestion(@Param('id') questId: string) {
    return this.questionService.getSingleQuestion(questId);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') questId: string) {
    await this.questionService.deleteProduct(questId);
    return null;
  }

  @Patch(':id')
  async updateQuestion(
    @Param('id') questId: string,
    @Body('question') question: string,
    @Body('answer') answer: string,
    @Body('points') points: number,
  ) {
    await this.questionService.updateQuestion(
      questId,
      question,
      answer,
      points,
    );
    return null;
  }
}
