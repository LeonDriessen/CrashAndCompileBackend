import * as mongoose from 'mongoose';
const mong = require('mongoose');
const bcrypt = require('bcrypt');

export const QuestionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});

export interface Question extends mongoose.Document {
  id: string;
  name: string;
  role: string;
  password: number;
}

const questionModel = new mong.model('Question', QuestionSchema);

module.exports = questionModel;
