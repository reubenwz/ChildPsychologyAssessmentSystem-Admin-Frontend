import { Domain } from './domain';
import { MainQuestion } from './main-question';

export interface AgeGroup {
  ageGroupId?: number;
  ageRange: string;
  domain?: Domain;
  questions: MainQuestion[];
}
