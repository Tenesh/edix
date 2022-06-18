import express, {Request, Response} from 'express';
import {SubmissionCreatedPublisher} from '../events/publishers/submission-created-publisher';
import {natsWrapper} from '../nats-wrapper';

import {createCompilerJob} from "../jobs/create";

const router = express.Router();

router.post('/api/submission', async (req: Request, res: Response) => {
    const {code} = req.body;
    const language = 'js';

    res.status(200).send(code);

    await new SubmissionCreatedPublisher(natsWrapper.client).publish({
        code: code
    })

    const compilerJob = new createCompilerJob;
    compilerJob.create('Hi Mate');

})

export {router as createRouter};