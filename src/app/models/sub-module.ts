import { MainQuestion } from './main-question';
import { SubQuestion } from './sub-question';

export interface SubModule {
  subModuleId?: number;
  subModuleName: string;
  subModuleDescription?: string[];
  isInfo: boolean;
  ques?: MainQuestion;
  subQues: SubQuestion[];
}
