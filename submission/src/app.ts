import express from 'express';
import {json} from 'body-parser';
import {createRouter} from './routes/create';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(createRouter);

export {app};