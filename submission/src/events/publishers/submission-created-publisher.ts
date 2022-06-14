import {Publisher} from '../publisher';
import {SubmissionSubject} from '../subjects';
import {SubmissionCreatedEvent} from '../submission-created-event';

export class SubmissionCreatedPublisher extends Publisher<SubmissionCreatedEvent> {
    readonly subject = SubmissionSubject.SubmissionCreated;
}