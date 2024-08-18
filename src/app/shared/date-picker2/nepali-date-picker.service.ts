import { Injectable } from '@angular/core';
import {EngToNepPipe} from './eng-to-nep.pipe';

/**
 * Load Jquery and Nepali Datepicker Calender functions
 */
declare var jQuery: any;
declare var calendarFunctions: any

@Injectable({
  providedIn: 'root'
})

/**
 * Nepali Date Conveter Service
 * BS<=>AD
 */
export class NepaliDateConverter {

  /**
   * Split Date Character
   */
  private dateSplitChar: string = '-';

  /**
   * Date Format
   *
   * @var  {[type]}
   */
  private dateFormat: string = `%y${this.dateSplitChar}%m${this.dateSplitChar}%d`;

  constructor() { }

  /**
   * Function that convets english date to nepali date
   * @param englishDate English Date
   */
  public ADtoBS(englishDate: any): string {
    englishDate = new Date(this.replaceDate(englishDate));
    if (isNaN(englishDate.getDate()) || englishDate == null) {
      console.log('Invalid english date');
      return '';
    }
    let currentNepaliDate = calendarFunctions.getBsDateByAdDate(englishDate.getFullYear(), englishDate.getMonth() + 1, englishDate.getDate());
    let formatedNepaliDate = calendarFunctions.bsDateFormat(this.dateFormat, currentNepaliDate.bsYear, currentNepaliDate.bsMonth, currentNepaliDate.bsDate);

    return this.formatNepaliDate(formatedNepaliDate);
  }

  /**
   * Function that converts nepali date to english date
   * @param nepaliDate
   */
  public BStoAD(nepaliDate: string): string {
    if(!nepaliDate){
      console.log('Invalid Nepali Date.');
      return '';
    }
    nepaliDate = new EngToNepPipe().transform(nepaliDate).replace(/\//g, '/');
    let nepaliDateArray = nepaliDate.split(this.dateSplitChar);
    let nepYear = nepaliDateArray[0], nepMonth = nepaliDateArray[1], nepDay = nepaliDateArray[2];

    //find english date
    let engDate = calendarFunctions.getAdDateByBsDate(calendarFunctions.getNumberByNepaliNumber(nepYear), calendarFunctions.getNumberByNepaliNumber(nepMonth), calendarFunctions.getNumberByNepaliNumber(nepDay));
    let engYear: number = engDate.getFullYear();
    let engMonth: number = engDate.getMonth() + 1;
    let engDay: number = engDate.getDate();

    //Append 0 with month and year, eg: 4 becomes 04 etc
    let month = engMonth.toString().length == 1 ? `0${engMonth}` : engMonth;
    let day = engDay.toString().length == 1 ? `0${engDay}` : engDay;
    //Returns yyyy/mm/dd with dateSplitChar /
    return `${engYear}${this.dateSplitChar}${month}${this.dateSplitChar}${day}`;
  }

  /**
   * Replace Date String
   * @param date
   */
  public replaceDate(date: any) {
    if (date != null) {
      if (typeof date === 'object') {
        return date;
      } else {
        return date.replace('-', this.dateSplitChar).replace('/', this.dateSplitChar);
      }
    }
    else
      return null;
  }

  /**
   * Return nepali date as english number
   * @param nepaliDate
   */
  private formatNepaliDate(nepaliDate: string) {
    let dateArray = nepaliDate.split(this.dateSplitChar);
    let year = calendarFunctions.getNumberByNepaliNumber(dateArray[0]);
    let month = calendarFunctions.getNumberByNepaliNumber(dateArray[1]);
    let day = calendarFunctions.getNumberByNepaliNumber(dateArray[2]);
    month = month.toString().length == 1 ? `0${month}` : month;
    day = day.toString().length == 1 ? `0${day}` : day;
    // Returns yyyy/mm/dd with dateSplitChar /
    return `${year}${this.dateSplitChar}${month}${this.dateSplitChar}${day}`;
  }

  /**
   * fn to return date details
   * @param nepaliDate: Nepali date
   */
  public getNepaliDateDetails(nepaliDate: string){
    let dateArray =nepaliDate.split(this.dateSplitChar);
    const yr= Number(dateArray[0])
    const mnth= Number(dateArray[1])
    const day= Number(dateArray[2])
    return calendarFunctions.bsDateFormat("%y %M, %d %D", yr, mnth, day).split(" ")
  }


}
