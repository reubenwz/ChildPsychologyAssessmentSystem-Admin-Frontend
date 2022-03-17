import { AssessmentRatingsDefinition } from './assessment-ratings-definition';

export interface AssessmentQuestion {
  questionId?: number;
  questionCode: string;
  questionTitle: string;
  questionDescription: string[];
  questionToConsider: string[];
  ratingsDefinition: AssessmentRatingsDefinition;
}
