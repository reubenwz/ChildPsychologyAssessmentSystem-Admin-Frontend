import { Assessor } from './assessor';

export interface Certification {
  certificationId: number;
  dateOfCert: string;
  vignette: string;
  recentScore: number;
  noOfTimesRecertified: number;
  assessor?: Assessor;
}
