import { Caretaker } from './caretaker';
import { Assessment } from './assessment';
import { CaretakerTypeEnum } from './caretaker-type-enum';
import { CaretakerAlgorithmEnum } from './caretaker-algorithm-enum';
import { AssessmentResponse } from './assessment-response';

export interface DenormalizedCaretakerAssessment {
  caretakerAssessmentId: number;
  levelOfNeeds?: CaretakerAlgorithmEnum;
  caretakerType?: CaretakerTypeEnum;
  caretaker: Caretaker;
  assessment: Assessment;
  caretakerResponse?: AssessmentResponse;
}
