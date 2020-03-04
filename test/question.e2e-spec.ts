import { QuestionService } from '../src/question/question.service'
import { QuestionSchema } from '../src/question/question.model';
import { QuestionModule } from '../src/question/question.module';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { Test } from '@nestjs/testing';

const mongoose = require('mongoose')
let questionService;
const questionModel = mongoose.model('Question', QuestionSchema);



describe('Questions', () =>{
    let app: INestApplication;

    beforeAll(async () => {
        const connection =  "mongodb+srv://dbUser:5xay1gmDvwdyCfXz@cluster0-zuzs1.azure.mongodb.net/questions-test?retryWrites=true&w=majority";
        await mongoose.connect(connection, {useNewUrlParser: true});
        

        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
          })

            .compile();
        app = moduleRef.createNestApplication();
        await app.init();
      });

    it('/GET questions', async() =>{
       
        //_id is not represented as string in .find.exec() need to override
       // const result = await questionModel.find().exec(); 

        return request(app.getHttpServer())
        .get('/question')
        .expect(200)
        //.expect(result );
    });

    afterAll(async(done) =>{
        mongoose.disconnect(done);
        await app.close();

    });
});