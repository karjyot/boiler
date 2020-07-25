import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterArr',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], term): any {
var data = ''
    if(items.length){
        data  = items.toString();
    }

      return data;
     
    }
}

