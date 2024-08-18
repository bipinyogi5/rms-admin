import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare let alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor(private toastr: ToastrService) {
    this.setTopRight();
  }

  confirm(
    message: string,
    header: string = 'UPDATE' || 'DELETE',
    okCallback: () => any
  ) {
    alertify
      .confirm(message, function (e) {
        if (e) {
          okCallback();
        } else {
        }
      })
      .setHeader(`<em class="text-danger"><b>${header}</b></em> `);
  }

  setBottomLeftPosition() {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-left';
  }

  setBottomRightPosition() {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  }

  setTopRight() {
    this.toastr.toastrConfig.positionClass = 'toast-top-right';
  }

  success(message: string) {
    this.toastr.success(message);
    setTimeout(()=>{
      window.document.body.click()

    },0)

  }

  error(message: string) {
    this.toastr.error(message);
    setTimeout(()=>{
      window.document.body.click()

    },0)

  }

  warning(message: string) {
    this.toastr.warning(message);
  }

  message(message: string) {
    this.toastr.info(message);
    setTimeout(()=>{
      window.document.body.click()

    },0)

  }

  clear(toastId?: number) {
    this.toastr.clear(toastId);
  }
}
