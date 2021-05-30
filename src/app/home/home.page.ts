import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
 
  public data: any = [];
  public complete: any = [];
  public filters: any[] = [];
  public item :any;
  public filter;
  public amount;
  public account;
  public origin;
  constructor(
    public http: HttpClient
    ) {}

  ngOnInit(): void {
    this.getData();
  }

  private readonly URL = 'assets/mock/books.json';

  getData() {
    this.http.get('assets/mock/books.json').forEach(fullData =>{
        console.log('getData_fullData '+  JSON.stringify(fullData));
        fullData['data'].forEach(element => {
          //console.log('getData_element '+  JSON.stringify(element));
            
          const item = {
            icon: 'assets/icons/' + element.general.title +'.png',
            title: element.general.title,
            author: element.general.author,
            year: element.detail.year,
            publisher: element.detail.publisher,
          };
          
          this.complete.push(item);  
          this.filters = this.complete;   
         // this.data.push(element);          
          console.log('getData_element '+  JSON.stringify(this.complete));
        });
        
    });
  }

  getItems(key: any){
    console.log('getItems start');
    this.complete = this.filters;
    console.log('getItems 1' + JSON.stringify(key));
    if( key && key.trim() != ''){
      this.complete = this.complete.filter(result=>{
        console.log('getItems 2' + JSON.stringify(result));
        console.log('getItems 3' + String(result.title).toLowerCase());
          return (String(result.title).toLowerCase().indexOf(String(key).toLowerCase()) > -1);
      });
      console.log('getItems 4' +JSON.stringify( this.complete));
    }else{
      console.log('empty');
    }
  }

  orderBy(order: any){
    console.log('orderBy start ' + order);

    this.complete = this.complete.sort((function(a, b){
      if ( a[order] < b[order] )
  	    return -1;
      if ( a[order] < b[order] )
        return 1;
    }));
    console.log(JSON.stringify(this.complete));
  }
}
