import {Directive, Input, ElementRef, HostListener, SimpleChanges} from '@angular/core';
import {FormControl, NgModel, Validators} from '@angular/forms';
import {NepaliDateConverter} from './nepali-date-picker.service';
import { ToastrService } from 'ngx-toastr';


/**
 * Initialize jQuery
 */
declare var jQuery: any;

@Directive({
  selector: '[appDatePicker]',
  standalone:true
})

/**
 * Nepali Datepicker
 */
export class appDatePickerDirective {
  /**
   * Date Element
   */
  private element: HTMLInputElement;
  /**
   * Date Format
   *
   * @var  {[type]}
   */
  private dateFormat: string = 'yyyy-mm-dd';

  /**
   * Show Today's Nepali Date
   */
  @Input() showToday: boolean = false;

  /**
   * Converts Element's English Date Value to Nepali
   */
  @Input() ADtoBS: boolean = false;

  /**
   * Converts Element's Nepali Date Value to English
   */
  @Input() bsToAds: string = '';

  /**
   * Default Datepicker Value
   */
  @Input() defaultDate: string = '';

  /**
   * Maximun Date Value
   * Used to prevent future dates
   */
  @Input() maxDate: string = '';
  @Input() minDate: string = '';

  @Input() field!: FormControl;

  @Input() modelName!: NgModel;

  @Input() language: string = 'gregorian';

  @Input() report: boolean = false;

  /**
   * Default Constructor
   * @param {ElementRef} elRef
   * @param nepaliDateConverter
   * @param alertifyService
   * @memberof NepaliDirective
   */
  constructor(
    private elRef: ElementRef,
    private nepaliDateConverter: NepaliDateConverter,
    private alertifyService: ToastrService,
  ) {
    this.element = this.elRef.nativeElement;
  }

  /**
   * Handle Change Event
   * @param $event
   */
  @HostListener('keyup', ['$event']) onEvent($event: any) {
    const value = this.element.value;
    const datePattern = '^\\d{4}-\\d{2}-\\d{2}$';
    this.element.setAttribute('pattern', datePattern);
    if (this.field) {
      this.field.setValidators(Validators.pattern(datePattern));
    }

    if (value.toString().length > 10) {
      //Reset Contol Value to empty
      if (this.field) {
        // this.alertifyService.error(this.translate.instant('invalidDateFormat'));
        this.field.setValue('');
      }
    }
    console.log(value.toString().length);
    if (value.toString().length == 10) {
      this.setEnglishDate(
        '#ad_form_field_' + this.bsToAds,
        this.nepaliDateConverter.BStoAD(value)
      );
    }
  }

  /**
   * Handle Changes
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['minDate']) {
      //On MinDate Changes
      jQuery(this.element).calendarsPicker('option', {minDate: changes['minDate'].currentValue});
    }
    if (changes['maxDate']) {
      //On maxDate Changes
      jQuery(this.element).calendarsPicker('option', {maxDate: changes['maxDate'].currentValue});
    }
    this.element.setAttribute('mask', '0000-00-00');
  }

  ngAfterViewInit() {
    /**
     * Attach Datepicker Instance
     */
    this.attachDatePickerInstance();
    /**
     * Check Show Today
     */
    if (this.showToday == true) {
      this.setTodayDate();
    }
    /**
     * Convert elements AD value to BS
     */
    if (this.ADtoBS == true) {
      let englishDate = new Date(this.element.value);
      if (isNaN(englishDate.getDate())) {
        console.log('Element has invalid english date');
        return;
      }

      /**
       * Set Nepali Date and Attach Date Picker Instance
       */
      this.element.value = this.nepaliDateConverter.ADtoBS(englishDate);
    }
  }

  /**
   * Attach Nepali Date Picker Instance
   *
   */
  private attachDatePickerInstance() {
    // this.language = localStorage.getItem('lang') == 'np' ? 'nepali' : 'gregorian';
    // this.language='gregorian';\
    this.language = 'nepali'
    jQuery(this.element).calendarsPicker({
      calendar: jQuery.calendars.instance(this.language),
      dateFormat: this.dateFormat,
      defaultDate: this.defaultDate,
      maxDate: this.maxDate,
      minDate: this.minDate,
      onSelect: (dates: any) => {
        //Set Element Value
        const date =
          dates.length > 0 ? dates[0].formatDate(this.dateFormat) : '';
        if (this.field != undefined) {
          this.field.setValue(date);
        } else {
          this.setEnglishDate(this.element, date);
        }
        if (this.bsToAds !== '') {
          this.setEnglishDate(
            '#ad_form_field_' + this.bsToAds,
            this.nepaliDateConverter.BStoAD(date)
          );
        }
      },
    });
  }

  /**
   * Function that sets today as nepali date
   */
  private setTodayDate() {
    //Today's English Date
    let englishDate = new Date();
    console.log(englishDate);
    this.element.value = this.nepaliDateConverter.ADtoBS(englishDate);
  }

  /**
   * Function that sets English date to provided selector
   */
  private setEnglishDate(element: string | HTMLInputElement, date: string) {
    try {
      jQuery(element).val(date);
      jQuery(element)[0].dispatchEvent(new Event('input', {bubbles: true}));
    } catch (e) {

    }
  }
}
