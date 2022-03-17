import { AgeGroup } from './age-group';

export interface Domain {
  domainId?: number;
  domainName: string;
  domainDescription?: string[];
  module: boolean;
  caregiverDomain: boolean;
  ageGroups: AgeGroup[];
}
