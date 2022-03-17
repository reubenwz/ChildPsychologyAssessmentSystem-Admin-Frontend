import { AssessmentQuestion } from './assessment-question';

export interface AssessmentResponse {
  responseId: number;
  responseValue: number;
  responseNotes?: string;
  question: AssessmentQuestion;
}
