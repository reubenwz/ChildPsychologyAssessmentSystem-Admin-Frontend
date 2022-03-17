import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AssessmentQuestionService } from '../assessment-question.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateDomainDialogComponent } from './create-domain-dialog/create-domain-dialog.component';
import { AgeGroup } from '../../../models/age-group';
import { CreateAgeGroupDialogComponent } from './create-age-group-dialog/create-age-group-dialog.component';
import { Domain } from '../../../models/domain';
import { SubModule } from '../../../models/sub-module';
import { CreateSubQuestionDialogComponent } from './create-sub-question-dialog/create-sub-question-dialog.component';
import { MainQuestion } from '../../../models/main-question';
import { SubQuestion } from '../../../models/sub-question';
import { ViewSubQuestionDialogComponent } from './view-sub-question-dialog/view-sub-question-dialog.component';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { CreateMainQuestionDialogComponent } from './create-main-question-dialog/create-main-question-dialog.component';
import { CreateSubModuleDialogComponent } from './create-sub-module-dialog/create-sub-module-dialog.component';
import { ApplicationStateService } from '../../../services/application-state.service';
import { ViewMainQuestionDialogComponent } from './view-main-question-dialog/view-main-question-dialog.component';
import { ViewDomainDialogComponent } from './view-domain-dialog/view-domain-dialog.component';
import { ViewAgeGroupDialogComponent } from './view-age-group-dialog/view-age-group-dialog.component';
import { ViewSubModuleDialogComponent } from './view-sub-module-dialog/view-sub-module-dialog.component';

@Component({
  selector: 'app-list-assessment-question',
  templateUrl: './list-assessment-question.component.html',
  styleUrls: ['./list-assessment-question.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService, ConfirmationService],
})
export class ListAssessmentQuestionComponent implements OnInit, OnDestroy {
  private createDomainRef?: DynamicDialogRef;
  private createAgeGroupRef?: DynamicDialogRef;
  private createMainQuestionRef?: DynamicDialogRef;
  private createSubModuleRef?: DynamicDialogRef;
  private createSubQuestionRef?: DynamicDialogRef;
  private viewDomainRef?: DynamicDialogRef;
  private viewAgeGroupRef?: DynamicDialogRef;
  private viewMainQuestionRef?: DynamicDialogRef;
  private viewSubModuleRef?: DynamicDialogRef;
  private viewSubQuestionRef?: DynamicDialogRef;

  constructor(
    public applicationStateService: ApplicationStateService,
    public assessmentQuestionService: AssessmentQuestionService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnDestroy(): void {
    if (this.createDomainRef) {
      this.createDomainRef.close();
    }
    if (this.createAgeGroupRef) {
      this.createAgeGroupRef.close();
    }
    if (this.createMainQuestionRef) {
      this.createMainQuestionRef.close();
    }
    if (this.createSubModuleRef) {
      this.createSubModuleRef.close();
    }
    if (this.createSubQuestionRef) {
      this.createSubQuestionRef.close();
    }

    if (this.viewDomainRef) {
      this.viewDomainRef.close();
    }
    if (this.viewAgeGroupRef) {
      this.viewAgeGroupRef.close();
    }
    if (this.viewMainQuestionRef) {
      this.viewMainQuestionRef.close();
    }
    if (this.viewSubModuleRef) {
      this.viewSubModuleRef.close();
    }
    if (this.viewSubQuestionRef) {
      this.viewSubQuestionRef.close();
    }
  }

  ngOnInit(): void {
    if (this.assessmentQuestionService.hasDraft()) {
      this.confirmationService.confirm({
        message: 'You have a draft, would you like to continue editing?',
        accept: () => {
          this.assessmentQuestionService.retrieveDraft();
        },
        reject: () => {
          this.assessmentQuestionService.deleteDraft();
        },
      });
    } else {
      this.assessmentQuestionService.getAssessmentQuestions();
    }
  }

  public openCreateDomainDialog() {
    this.createDomainRef = this.dialogService.open(
      CreateDomainDialogComponent,
      {
        header: 'Create Domain',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
      }
    );
  }

  public openCreateAgeGroupDialog(domain: Domain) {
    this.createAgeGroupRef = this.dialogService.open(
      CreateAgeGroupDialogComponent,
      {
        header: 'Create Age Group',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
        data: domain,
      }
    );
  }

  public openCreateMainQuestionDialog(ageGroup: AgeGroup) {
    this.createMainQuestionRef = this.dialogService.open(
      CreateMainQuestionDialogComponent,
      {
        header: 'Create Main Question',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
        data: ageGroup,
      }
    );
  }

  public openCreateSubModuleDialog(mainQuestion: MainQuestion) {
    this.createSubModuleRef = this.dialogService.open(
      CreateSubModuleDialogComponent,
      {
        header: 'Create Sub Module',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
        data: mainQuestion,
      }
    );
  }

  public openCreateSubQuestionDialog(subModule: SubModule) {
    this.createSubQuestionRef = this.dialogService.open(
      CreateSubQuestionDialogComponent,
      {
        header: 'Create Sub Question',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
        data: subModule,
      }
    );
  }

  public openViewDomainDialog(domain: Domain) {
    this.viewDomainRef = this.dialogService.open(ViewDomainDialogComponent, {
      header: 'View Domain',
      width: '90%',
      contentStyle: { height: '90vh', overflow: 'auto' },
      baseZIndex: 100,
      data: domain,
    });
  }

  public openViewAgeGroupDialog(ageGroup: AgeGroup) {
    this.viewAgeGroupRef = this.dialogService.open(
      ViewAgeGroupDialogComponent,
      {
        header: 'View Age Group',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
        data: ageGroup,
      }
    );
  }

  public openViewMainQuestionDialog(mainQuestion: MainQuestion) {
    this.viewMainQuestionRef = this.dialogService.open(
      ViewMainQuestionDialogComponent,
      {
        header: 'View Main Question',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
        data: mainQuestion,
      }
    );
  }

  public openViewSubModuleDialog(subModule: SubModule) {
    this.viewSubModuleRef = this.dialogService.open(
      ViewSubModuleDialogComponent,
      {
        header: 'View Sub Module',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
        data: subModule,
      }
    );
  }

  public openViewSubQuestionDialog(subQuestion: SubQuestion) {
    this.viewSubQuestionRef = this.dialogService.open(
      ViewSubQuestionDialogComponent,
      {
        header: 'View Sub Question',
        width: '90%',
        contentStyle: { height: '90vh', overflow: 'auto' },
        baseZIndex: 100,
        data: subQuestion,
      }
    );
  }

  public isAgeGroup(val: TreeNode): boolean {
    if (val.parent) {
      return val.parent.data.domainName !== undefined;
    }
    return false;
  }

  public isMainQuestion(val: TreeNode): boolean {
    if (val.parent) {
      return val.parent.data.ageRange !== undefined;
    }
    return false;
  }

  public isSubModule(val: TreeNode): boolean {
    if (val.parent) {
      return val.parent.data.questionCode !== undefined;
    }
    return false;
  }

  public isSubQuestion(val: TreeNode): boolean {
    if (val.parent) {
      return val.parent.data.subModuleName !== undefined;
    }
    return false;
  }
}
