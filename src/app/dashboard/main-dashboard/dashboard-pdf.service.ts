import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import * as htmlToImage from 'html-to-image';
import { ApplicationStateService } from '../../services/application-state.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardPdfService {
  constructor(private applicationStateService: ApplicationStateService) {}

  public saveCharts(allElements: HTMLCollectionOf<Element>) {
    this.applicationStateService.startProcessing();
    const printDoc = new jsPDF('landscape', 'px', 'A4');
    const jsPdfObservable: Subject<jsPDF> = new Subject<jsPDF>();

    this.recursivelySaveCharts(printDoc, allElements, jsPdfObservable)
      .pipe(first())
      .subscribe((result) => {
        this.applicationStateService.endProcessing();
        result.autoPrint();
        result.output('dataurlnewwindow');
      });
  }

  private recursivelySaveCharts(
    currentObject: jsPDF,
    allElements: HTMLCollectionOf<Element>,
    jsPdfObservable: Subject<jsPDF>,
    canvasImages: string[] = [],
    currentIndex: number = 0
  ): Observable<jsPDF> {
    const element: HTMLElement = <HTMLElement>allElements.item(currentIndex);
    htmlToImage
      .toCanvas(element, {
        width: 3508,
        height: 2480,
        backgroundColor: '#FFFFFF',
      })
      .then((canvasElement) => {
        canvasImages.push(canvasElement.toDataURL('image/jpeg'));
        currentIndex = currentIndex + 1;
        if (currentIndex === allElements.length) {
          for (let x = 0; x < canvasImages.length; x++) {
            currentObject = currentObject.addImage({
              imageData: canvasImages[x],
              x: 60,
              y: 20,
              width: 1123,
              height: 794,
            });
            if (x + 1 !== canvasImages.length) {
              currentObject = currentObject.addPage();
              // 1 based index for page
              currentObject = currentObject.setPage(x + 2);
            }
          }

          jsPdfObservable.next(currentObject);
        } else {
          this.recursivelySaveCharts(
            currentObject,
            allElements,
            jsPdfObservable,
            canvasImages,
            currentIndex
          );
        }
      });

    return jsPdfObservable;
  }
}
