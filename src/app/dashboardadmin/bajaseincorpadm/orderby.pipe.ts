import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
 name: 'orderByPipe'
})
export class OrderByPipe implements PipeTransform{

 transform(array: Array<string>, args: string): Array<string> {

  if(!array || array === undefined || array.length === 0) return null;

    array.sort((a: any, b: any) => {
      if (a.texto < b.texto) {
        return -1;
      } else if (a.texto > b.texto) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}