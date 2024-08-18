import { Injectable } from '@angular/core';
declare var jQuery: any;

@Injectable({
  providedIn: 'root'
})
export class ConfirmDailogService {

  constructor() { }
  confirm(title,content,color,funcToCall){
    jQuery.confirm({
      title: title,
      content: content,
      type: color,
      buttons: {
        ok: {
          text: "ok",
          btnClass: 'btn-primary',
          //keys: ['enter'],
          action: function () {
            debugger;
            funcToCall()
          }
        },
        cancel: function () {
          console.log('the user clicked cancel');
        }
      }
    })
  }

  deleteCofirm(funcToCall) {
    jQuery.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete?',
      type: 'red',
      buttons: {
        ok: {
          text: "ok",
          btnClass: 'btn-primary',
          //keys: ['enter'],
          action: function () {
            debugger;
            funcToCall()
          }
        },
        cancel: function () {
          console.log('the user clicked cancel');
        }
      }
    })
  }
  
  acceptCofirm(func: any) {
    jQuery.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to accept?',
      type: 'green',
      buttons: {
        ok: {
          text: "ok",
          btnClass: 'btn-primary',
          keys: ['enter'],
          action: function () {
            func()
          }
        },
        cancel: function () {
          console.log('the user clicked cancel');
        }
      }
    })
  }
  rejectCofirm(func: any) {
    jQuery.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to reject?',
      type: 'green',
      buttons: {
        ok: {
          text: "ok",
          btnClass: 'btn-danger',
          keys: ['enter'],
          action: function () {
            func()
          }
        },
        cancel: function () {
          console.log('the user clicked cancel');
        }
      }
    })
  }
  saveCofirm(func: any) {
    jQuery.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to save changes?',
      type: 'green',
      buttons: {
        ok: {
          text: "ok",
          btnClass: 'btn-primary',
          keys: ['enter'],
          action: function () {
            // console.log('the user clicked confirm');
            func()
          }
        },
        cancel: function () {
          console.log('the user clicked cancel');
        }
      }
    })
  }
  custCofirm(obj,func) {
    jQuery.confirm({
      title: obj.title,
      content: obj.content,
      type: obj.type,
      buttons: {
        ok: {
          text: "ok",
          btnClass: 'btn-primary',
          //keys: ['enter'],
          action: function () {
            func()
          }
        },
        cancel: function () {
          console.log('the user clicked cancel');
        }
      }
    })
  }
  manageTable(func: any) {
    jQuery.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to manage table ?',
      type: 'green',
      buttons: {
        ok: {
          text: "ok",
          btnClass: 'btn-primary',
          keys: ['enter'],
          action: function () {
            // console.log('the user clicked confirm');
            func()
          }
        },
        cancel: function () {
          console.log('the user clicked cancel');
        }
      }
    })
  }

  inputConfirm(obj, func) {
    const content = document.createElement("div");
  
    // Add a line break before the input field
    const lineBreak = document.createElement("br");
    content.appendChild(obj.inputField); // Insert the input field
  
    const buttons = {
      ok: {
        text: "OK",
        btnClass: 'btn-primary',
        action: function () {
          const reason = obj.inputField.value; // Get the value of the input field
          func(reason); // Pass the input value to the callback function
        }
      },
      cancel: function () {
        console.log('The user clicked cancel');
      }
    };
  
    jQuery.confirm({
      title: obj.title,
      content: content, // Set the content as the modified content element
      type: obj.type,
      buttons: buttons
    });
  }
}
