import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(lista: any[], texto): any[] {
    if(!texto){
      return lista;
    }
    console.log(lista.filter(commit => commit.oid.toUpperCase().includes(texto.toUpperCase())))
    localStorage.setItem('commitsFilter', JSON.stringify(lista.filter(commit => commit.oid.toUpperCase().includes(texto.toUpperCase()))));
    return lista.filter(commit => commit.oid.toUpperCase().includes(texto.toUpperCase()))
  }

}
