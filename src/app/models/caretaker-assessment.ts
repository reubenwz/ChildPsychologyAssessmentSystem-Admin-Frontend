import { Caretaker } from './caretaker';
import { Assessment } from './assessment';
import { AssessmentResponse } from './assessment-response';
import { CaretakerTypeEnum } from './caretaker-type-enum';
import { CaretakerAlgorithmEnum } from './caretaker-algorithm-enum';

export interface CaretakerAssessment {
  caretakerAssessmentId: number;
  levelOfNeeds?: CaretakerAlgorithmEnum;
  caretakerType?: CaretakerTypeEnum;
  caretaker: Caretaker;
  assessment: Assessment;
  caretakerResponses: AssessmentResponse[];
}
