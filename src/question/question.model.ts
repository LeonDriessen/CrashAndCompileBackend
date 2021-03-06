import * as mongoose from 'mongoose';
const mong = require('mongoose');

export const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  points: { type: Number, required: true },
});

export interface Question extends mongoose.Document {
  id: string;
  question: string;
  answer: string;
  points: number;
}

const questionModel = new mong.model('Question', QuestionSchema);

module.exports = questionModel;
