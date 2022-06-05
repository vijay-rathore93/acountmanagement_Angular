import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerServiceService } from 'src/app/services/customer/customer-service.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() isSsnPopup: boolean;
  password: string;

  constructor(private activeModal: NgbActiveModal) { }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    if((this.isSsnPopup && this.password==='admin') || !this.isSsnPopup){
      this.activeModal.close(true);
    } else {
      this.activeModal.close(false);
    }
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}