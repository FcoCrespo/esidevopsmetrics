import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items : any[], field : any, value : string): any[] {
    if (!items) return [];
    if (typeof field == 'string') {
      let rtItems: any = items;
      rtItems = items.filter(it => it[field].toLowerCase().indexOf(value.toLowerCase()) > -1);
      return rtItems;
      
    } else {
      let rtItems: any = items;
    
      rtItems = items.filter(it => {
        for (let f of field) {
          if (it[f].toLowerCase().indexOf(value.toLowerCase()) > -1) {
            return true;
          }
        }
      });
      
      return rtItems;
      
    }
    
    /*if(!texto){
      return lista;
    }

    if(lista.filter(commit => commit.oid.toUpperCase().includes(texto.toUpperCase()))){
      console.log(lista.filter(commit => commit.oid.toUpperCase().includes(texto.toUpperCase())))
      localStorage.setItem('commitsFilter', JSON.stringify(lista.filter(commit => commit.oid.toUpperCase().includes(texto.toUpperCase()))));
      return lista.filter(commit => commit.oid.toUpperCase().includes(texto.toUpperCase()))
    }*/
  }

}
