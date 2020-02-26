import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionSchema } from './app.model';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:5xay1gmDvwdyCfXz@cluster0-zuzs1.azure.mongodb.net/questions-test?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
