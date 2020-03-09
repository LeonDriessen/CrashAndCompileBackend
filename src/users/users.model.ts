import * as mongoose from 'mongoose';
import { Binary } from 'mongodb';
const mong = require('mongoose');
var encrypt = require('mongoose-bcrypt');

export const UsersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});

//var encKey = process.env.SOME_32BYTE_BASE64_STRING;

//UsersSchema.plugin(encrypt);

export interface User extends mongoose.Document {
  id: string;
  username: string;
  role: string;
  password: string;
}

const userModel = new mong.model('User', UsersSchema);

module.exports = userModel;
//{
// userModel: userModel,
//UsersSchema: UsersSchema,
//};
