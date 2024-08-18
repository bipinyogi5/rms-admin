import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'engToNep',
  pure: false,
})
export class EngToNepPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      var mapObj:any = {
        0: '०',
        1: '१',
        2: '२',
        3: '३',
        4: '४',
        5: '५',
        6: '६',
        7: '७',
        8: '८',
        9: '९',
      };
      value = value
        .toString()
        .replace(/0|1|2|3|4|5|6|7|8|9/gi, function (x: string ) {
          return mapObj[x];
        });
      return value;
    }
  }
}
