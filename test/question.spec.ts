import { QuestionService } from '../src/question/question.service';
import { QuestionSchema } from '../src/question/question.model';
import { NotFoundException } from '@nestjs/common';

const mongoose = require('mongoose');
let newQuestion;
let savedId;
let savedQuestion;
let questionService;
const questionData = {
  question: 'MockQuestion',
  answer: 'MockAnswer',
  points: 20,
};
const questionModel = mongoose.model('Question', QuestionSchema);

describe('Question', () => {
  beforeAll(async () => {
    const connection =
      'mongodb+srv://dbUser:5xay1gmDvwdyCfXz@cluster0-zuzs1.azure.mongodb.net/questions-test?retryWrites=true&w=majority';
    await mongoose.connect(connection, { useNewUrlParser: true });
  });

  beforeEach(async () => {
    newQuestion = new questionModel(questionData);
    questionService = new QuestionService(questionModel);
    savedId = newQuestion._id;
    savedQuestion = await newQuestion.save();
  });

  describe('Find questions', () => {
    it('should return an array of questions', async () => {
      const result = await questionModel.find().exec();
      expect(result.getLength >= 1);
    });

    it('should return the question with right questionid', async () => {
      const result = await questionModel.findOne(savedId);
      expect(result._id == savedId);
    });

    it('Should return a conflict if a question does not exist', async () => {
      const fakeQuestion = new questionModel({
        question: 'fakeQuestion',
        answer: 'fakeAnswer',
        points: -1,
      });
      const result = await questionModel.findOne(fakeQuestion._id);
      expect(result).toBe(null);
    });
  });

  describe('Add question', () => {
    it('Should insert a question to the database', async () => {
      const savedQuestion = await newQuestion.save();

      //Check data
      expect(savedQuestion._id).toBeDefined();
      expect(savedQuestion.question).toBe(questionData.question);
      expect(savedQuestion.answer).toBe(questionData.answer);
      expect(savedQuestion.points).toBe(questionData.points);
      expect(await questionModel.findOne(savedId));
    });

    it('should insert question and recognize wrong fields', async () => {
      expect(savedQuestion._id).toBeDefined();
      expect(savedQuestion.notafield).toBeUndefined();
    });
  });

  describe('Delete question', () => {
    it('should delete a question', async () => {
      const mockQuestion = new questionModel(questionData);
      const newId = mockQuestion._id;
      await mockQuestion.save();
      await questionModel.deleteOne({ _id: newId }).exec();
      const result = await questionModel.findOne(newId).exec();

      expect(result).toBe(null);
    });

    it('should delete a question and recognize if it is not there', async () => {
      const mockQuestion = new questionModel(questionData);
      const newId = mockQuestion._id;
      await mockQuestion.save();
      await questionModel.deleteOne({ _id: newId }).exec();
      const resultDelete = await questionModel.deleteOne({ _id: newId }).exec();
      const resultFind = await questionModel.findOne(newId).exec();

      expect(resultFind).toBe(null);
      expect(resultDelete.n === 0);

      // Want to check NotFoundException, but does not work
      // expect(async() => await questionService.deleteQuestion({_id:newId})).toThrow(NotFoundException);
    });
  });

  describe('Update question', () => {
    it('should update a question', async () => {
      await questionService.updateQuestion(savedId, 'ChangeQuestion');
      const result = await questionModel.findOne(savedId).exec();
      expect(result.question == 'ChangeQuestion');
    });
  });

  afterEach(async () => {
    await questionModel.deleteOne({ _id: savedId }).exec();
  });

  afterAll(done => {
    mongoose.disconnect(done);
  });
});
