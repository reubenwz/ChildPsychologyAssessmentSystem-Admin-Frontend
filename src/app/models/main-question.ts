import { AssessmentQuestion } from './assessment-question';
import { SubModule } from './sub-module';
import { AgeGroup } from './age-group';

export interface MainQuestion extends AssessmentQuestion {
  subModule?: SubModule;
  ageGroup?: AgeGroup;
}
