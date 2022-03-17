import { Injectable } from '@angular/core';
import { ApplicationStateService } from '../../services/application-state.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Domain } from '../../models/domain';
import { TreeNode } from 'primeng/api';
import { AssessmentQuestionServiceActions } from './assessment-question-service-actions';
import { StorageService } from '../../services/storage.service';
import { AgeGroup } from '../../models/age-group';
import { MainQuestion } from '../../models/main-question';
import { SubQuestion } from '../../models/sub-question';
import { SubModule } from '../../models/sub-module';

@Injectable({
  providedIn: 'root',
})
export class AssessmentQuestionService {
  public readonly assessmentQuestions$: BehaviorSubject<Domain[]> =
    new BehaviorSubject<Domain[]>([]);
  public readonly assessmentQuestionsDraft$: BehaviorSubject<Domain[]> =
    new BehaviorSubject<Domain[]>([]);
  public readonly assessmentQuestionTreeNodes$: BehaviorSubject<TreeNode[]> =
    new BehaviorSubject<TreeNode[]>([]);
  public readonly serviceState$: Subject<AssessmentQuestionServiceActions> =
    new Subject<AssessmentQuestionServiceActions>();
  private readonly assessmentQuestionsDraftKeyName =
    'ASSESSMENT_QUESTIONS_DRAFT';
  public readonly draftExistence$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private applicationStateService: ApplicationStateService,
    private apiService: ApiService,
    private storageService: StorageService
  ) {}

  public storeCurrentDraft(): void {
    this.storeDraft(this.assessmentQuestionsDraft$.getValue());
  }

  public storeDraft(domains: Domain[]): void {
    this.draftExistence$.next(true);
    this.assessmentQuestionsDraft$.next(domains);
    this.assessmentQuestionTreeNodes$.next(this.transformToTreeNode(domains));
    this.storageService.storeJsonData<Domain[]>(
      this.assessmentQuestionsDraftKeyName,
      domains
    );
  }

  public hasDraft(): boolean {
    const assessmentQuestionsDraft = this.storageService.retrieveJsonData<
      Domain[]
    >(this.assessmentQuestionsDraftKeyName);
    if (assessmentQuestionsDraft && assessmentQuestionsDraft.length > 0) {
      this.draftExistence$.next(true);
      return true;
    }
    this.draftExistence$.next(false);
    return false;
  }

  public retrieveDraft(): void {
    const assessmentQuestionsDraft = this.storageService.retrieveJsonData<
      Domain[]
    >(this.assessmentQuestionsDraftKeyName);
    this.assessmentQuestionsDraft$.next(assessmentQuestionsDraft);
    this.assessmentQuestionTreeNodes$.next(
      this.transformToTreeNode(assessmentQuestionsDraft)
    );
  }

  public submitDraft(): void {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedPost<any>(
        '/cans-backend-rws/Resources/AssessmentQuestionManagement/assessment-questions',
        JSON.parse(JSON.stringify(this.assessmentQuestionsDraft$.getValue()))
      )
      .subscribe(
        () => {
          this.applicationStateService.showSuccessMessage(
            'Draft submitted successfully!'
          );
          this.deleteDraft();
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
        }
      );
  }

  public deleteDraft(): void {
    this.storageService.removeData(this.assessmentQuestionsDraftKeyName);
    this.draftExistence$.next(false);
    this.getAssessmentQuestions();
  }

  public getAssessmentQuestions() {
    this.applicationStateService.startProcessing();
    this.apiService
      .authenticatedGet<Domain[]>(
        '/cans-backend-rws/Resources/AssessmentQuestionManagement/assessment-questions'
      )
      .subscribe(
        (assessmentQuestions) => {
          this.applicationStateService.endProcessing();
          this.assessmentQuestions$.next(assessmentQuestions);
          this.assessmentQuestionsDraft$.next(assessmentQuestions);
          this.assessmentQuestionTreeNodes$.next(
            this.transformToTreeNode(assessmentQuestions)
          );
        },
        (err) => {
          if (err.status === 409) {
            const errorMessageInJson: any = err.error;
            this.applicationStateService.showErrorMessage(
              errorMessageInJson.error
            );
          } else {
            this.applicationStateService.showErrorMessage(err.message);
          }
        }
      );
  }

  public createDomain(domain: Domain) {
    this.applicationStateService.startProcessing();
    const allDomains = this.assessmentQuestionsDraft$.getValue();
    allDomains.push(domain);
    this.storeCurrentDraft();
    this.applicationStateService.showSuccessMessage('Domain added as draft!');
    this.serviceState$.next(
      AssessmentQuestionServiceActions.SUCCESSFUL_DOMAIN_CREATION
    );
  }

  public createAgeGroup(ageGroup: AgeGroup, parentDomain: Domain) {
    this.applicationStateService.startProcessing();
    parentDomain.ageGroups.push(ageGroup);
    this.storeCurrentDraft();
    this.applicationStateService.showSuccessMessage(
      'Age group added as draft!'
    );
    this.serviceState$.next(
      AssessmentQuestionServiceActions.SUCCESSFUL_AGE_GROUP_CREATION
    );
  }

  public createMainQuestion(
    mainQuestion: MainQuestion,
    parentAgeGroup: AgeGroup
  ) {
    this.applicationStateService.startProcessing();
    parentAgeGroup.questions.push(mainQuestion);
    this.storeCurrentDraft();
    this.applicationStateService.showSuccessMessage(
      'Main question added as draft!'
    );
    this.serviceState$.next(
      AssessmentQuestionServiceActions.SUCCESSFUL_MAIN_QUESTION_CREATION
    );
  }

  public createSubModule(
    subModule: SubModule,
    parentMainQuestion: MainQuestion
  ) {
    this.applicationStateService.startProcessing();
    parentMainQuestion.subModule = subModule;
    this.storeCurrentDraft();
    this.applicationStateService.showSuccessMessage(
      'Sub module added as draft!'
    );
    this.serviceState$.next(
      AssessmentQuestionServiceActions.SUCCESSFUL_SUB_MODULE_CREATION
    );
  }

  public createSubQuestion(
    subQuestion: SubQuestion,
    parentSubModule: SubModule
  ) {
    this.applicationStateService.startProcessing();
    parentSubModule.subQues.push(subQuestion);
    this.storeCurrentDraft();
    this.applicationStateService.showSuccessMessage(
      'Sub question added as draft!'
    );
    this.serviceState$.next(
      AssessmentQuestionServiceActions.SUCCESSFUL_SUB_QUESTION_CREATION
    );
  }

  public updateAssessmentQuestionState() {
    this.applicationStateService.startProcessing();
    this.storeCurrentDraft();
    this.applicationStateService.showSuccessMessage('Update saved as draft!');
  }

  private transformToTreeNode(domains: Domain[]): TreeNode[] {
    const topLevelNodes: TreeNode[] = [];

    domains.forEach((domain) => {
      const domainLevelChildren: TreeNode[] = [];

      domain.ageGroups.forEach((ageGroup) => {
        const ageGroupLevelChildren: TreeNode[] = [];
        ageGroup.questions.forEach((mainQuestion) => {
          const mainQuestionLevelChildren: TreeNode[] = [];
          // Handle submodule
          const subModule = mainQuestion.subModule;
          const subModuleLevelChildren: TreeNode[] = [];
          if (subModule) {
            subModule.subQues.forEach((subQuestion) => {
              const subQuestionLevelNode: TreeNode = {
                data: subQuestion,
              };
              subModuleLevelChildren.push(subQuestionLevelNode);
            });
            const subModuleLevelNode: TreeNode = {
              data: subModule,
              children: subModuleLevelChildren,
            };
            mainQuestionLevelChildren.push(subModuleLevelNode);
          }
          // End submodule handling
          const mainQuestionLevelNode: TreeNode = {
            data: mainQuestion,
            children: mainQuestionLevelChildren,
          };
          ageGroupLevelChildren.push(mainQuestionLevelNode);
        });
        const ageGroupLevelNode: TreeNode = {
          data: ageGroup,
          children: ageGroupLevelChildren,
        };
        domainLevelChildren.push(ageGroupLevelNode);
      });
      const domainLevelNode: TreeNode = {
        data: domain,
        children: domainLevelChildren,
      };
      topLevelNodes.push(domainLevelNode);
    });

    return topLevelNodes;
  }
}
