import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AssessmentStatusEnum } from '../../../models/assessment-status-enum';

@Injectable({
  providedIn: 'root',
})
export class ViewSpecificAssessmentService {
  public editMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public statusList$: BehaviorSubject<AssessmentStatusEnum[]> =
    new BehaviorSubject<AssessmentStatusEnum[]>([
      AssessmentStatusEnum.ASSIGNED,
      AssessmentStatusEnum.APPROVED,
      AssessmentStatusEnum.SUBMITTED,
      AssessmentStatusEnum.REJECTED,
    ]);

  constructor() {}

  public enableEditing() {
    this.editMode$.next(true);
  }

  public disableEditing() {
    this.editMode$.next(false);
  }
}
