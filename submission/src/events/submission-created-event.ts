import {SubmissionSubject} from './subjects';

export interface SubmissionCreatedEvent {
    subject: SubmissionSubject.SubmissionCreated;
    data: {
        code: string
    }
}