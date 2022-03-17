import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GendersService } from '../../../services/genders.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CaretakersService } from '../../../services/caretakers.service';
import { CaretakersServiceActions } from '../../../services/caretakers-service-actions';
import { ApplicationStateService } from '../../../services/application-state.service';

@Component({
  selector: 'app-create-caretaker-dialog',
  templateUrl: './create-caretaker-dialog.component.html',
  styleUrls: ['./create-caretaker-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCaretakerDialogComponent implements OnInit, OnDestroy {
  public addCaretakerForm: FormGroup;
  private successSubscription$?: Subscription;

  constructor(
    public applicationStateService: ApplicationStateService,
    public clientService: ClientService,
    public caretakersService: CaretakersService,
    public gendersService: GendersService,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder
  ) {
    const client = this.clientService.specificClient$.getValue();
    this.addCaretakerForm = this.formBuilder.group({
      caretakerUniqueId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      idNumber: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: [new Date(), [Validators.required]],
      relationshipToClient: ['', [Validators.required]],
      address: ['', [Validators.required]],
      educationLevel: ['', [Validators.required]],
      currentOccupation: ['', [Validators.required]],
      accommodationStatus: ['', [Validators.required]],
      accommodationType: ['', [Validators.required]],
      monthlyIncome: [0, [Validators.required, Validators.min(0)]],
      clientId: [client?.clientId || '', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.caretakersService.serviceState$
      .pipe(
        filter(
          (state) =>
            state === CaretakersServiceActions.SUCCESSFUL_CARETAKER_CREATION
        )
      )
      .subscribe(() => {
        const client = this.clientService.specificClient$.getValue();
        if (client) {
          this.clientService.viewClientDetail(client.clientId);
        }
        this.ref.close();
      });
  }

  ngOnDestroy(): void {
    if (this.successSubscription$) {
      this.successSubscription$.unsubscribe();
    }
  }

  public addCaretaker() {
    this.caretakersService.createCaretaker(this.addCaretakerForm.getRawValue());
  }

  public cancelAddCaretaker() {
    this.ref.close();
  }
}
