import * as mongoose from 'mongoose';
const mong = require('mongoose');

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  role: string;
  password: number;
}

const userModel = new mong.model('User', UserSchema);

module.exports = userModel;
