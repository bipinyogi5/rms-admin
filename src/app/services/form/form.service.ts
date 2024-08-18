import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public invalidControls = [];

  constructor(public fb: FormBuilder) { }
  /**
  * To get all invalid controls from a form
  * @param formGroup : Name of the formGroup
  */
  public findInvalidControls(formGroup: FormGroup) {
    this.invalidControls = [];
    const controls = formGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.invalidControls.push(name);
      }
    }
    return this.invalidControls;
  }

  /**
   * Fxn to check form control validity
   * @param controlToCheck : Form Control to validate
   * @param form : Form to validate
   */
  public checkFormControlInvalid(controlToCheck: any, form: any) {
    const field = form.get(controlToCheck);
    return field != null && field.invalid && (field.touched || field.dirty);
  }

  /**
   * Checks validity after form submit
   * Just loop over all the formControl by making dirty as true
   * @param currentForm
   */
  public validateAllFormFields(currentForm: FormGroup) {
    let firstInvalidElement: string = null;
    Object.keys(currentForm.controls).forEach((field) => {
      const control = currentForm.get(field);
      if (control.status == 'INVALID' && firstInvalidElement == null) {
        firstInvalidElement = field;
      }

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });

    if (firstInvalidElement) {
      const element: HTMLElement = document.querySelector(
        "[formControlName='" + firstInvalidElement + "']"
      );
      if (element) {
        element.focus();
      }
    }
  }
  /**
  * Find Invalid fields in a form
  * @param currentForm
  */
  public displayInvalidFormControls(currentForm: FormGroup) {
    const invalid = [];
    const controls = currentForm.controls;
    for (const name in controls) {
      if (controls[name].status == 'INVALID') {
        invalid.push(name);
      }
    }
  }
  createDaynamicForms(data) {
    let obj = {}
    data.forEach(el => {
      let arr: Array<any> = ['']
      let validations = []
      if (el['IsCompulsory']) {
        validations.push(Validators.required)
      }
      if (el['InputType'] == 'email') {
        validations.push(Validators.email)
      }
      if (el['DbColumnType'].includes('varchar')) {
        
        validations.push(Validators.maxLength(Number(el['DbColumnType'].split('(')[1].split(')')[0])))
      }
      if (validations.length > 0) {
        arr.push(validations)
      }

      obj[el.DbColumnName] = arr
    })
    return this.fb.group({
      ...obj
    })
  }
    /**
   * Create Form Data from Object
   *
   * @param {Object} object
   * @param {FormData} [form]
   * @param {string} [namespace]
   * @returns {FormData}
   * @memberof RegistrationComponent
   */
    public createFormData(
      object: Object,
      form?: FormData,
      namespace?: string
    ): FormData {
      const formData = form || new FormData();
      for (let property in object) {
        if (!object.hasOwnProperty(property) || !object[property]) {
          continue;
        }
        const formKey = namespace ? `${namespace}.${property}` : property;
        if (object[property] instanceof Date) {
          formData.append(formKey, object[property].toISOString());
        } else if (
          typeof object[property] === 'object' &&
          !(object[property] instanceof File)
        ) {
          this.createFormData(object[property], formData, formKey);
        } else {
          formData.append(formKey, object[property]);
        }
      }
      return formData;
    }
}
