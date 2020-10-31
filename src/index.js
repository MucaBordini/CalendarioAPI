import 'dotenv/config';

import express from 'express';
//import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clustercalendario.gy82l.mongodb.net/<dbname>?retryWrites=true&w=majority`

const app = express();

app.use(cors());

//app.use(cookieParser());

app.use(express.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected');
});

app.use(routes);

app.listen(8000);
console.log('Server is running at http://localhost:8000');