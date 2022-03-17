import { AssessmentQuestion } from './assessment-question';
import { SubModule } from './sub-module';

export interface SubQuestion extends AssessmentQuestion {
  submodule?: SubModule;
}
