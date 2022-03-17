import { AssessmentStatusEnum } from './assessment-status-enum';
import { AssessmentReasonEnum } from './assessment-reason-enum';
import { Assessor } from './assessor';
import { Client } from './client';
import { AssessmentResponse } from './assessment-response';
import { CaretakerAssessment } from './caretaker-assessment';

export interface Assessment {
  assessmentId: number;
  assessmentUniqueId: number;
  assessmentDate: string;
  status?: AssessmentStatusEnum;
  reason?: AssessmentReasonEnum;
  approvedDate?: string;
  loc?: number;
  assessor: Assessor;
  client: Client;
  response: AssessmentResponse[];
  caretakerAssessments: CaretakerAssessment[];
}
