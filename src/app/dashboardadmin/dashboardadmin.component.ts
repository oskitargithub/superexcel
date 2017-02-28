import { Component, ViewEncapsulation } from '@angular/core';
import { AppConfig } from '../app.config';

import {AuthModel} from '../auth/auth.model';
import {DashBoardAdminService} from "./dashboardadmin.service";

declare var Messenger: any;
declare var jQuery: any;

@Component({
  selector: 'dashboardadmin',
  templateUrl: './dashboardadmin.template.html',
  styleUrls: ['./dashboardadmin.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardAdmin {
  config: any;
  month: any;
  year: any;
  
  public errorMessage: string;
	public status: string;

  rows: Array<any> = [];
  data: AuthModel[];
  columns: Array<any> = [
    {title: 'Usuario', name: 'usuario'},
    {title: 'Nombre', name: 'nombre', sort: false},
    {title: 'Apellidos', name: 'apellidos', sort: 'asc'}    
  ];

  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  tableconfig: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: '', columnName: 'nombre'}
  };
  ng2TableData: Array<any>;


  constructor(config: AppConfig, private dashboardadminservice:DashBoardAdminService ) {
    this.config = config.getConfig();
     let firstCellValue = 'No usuarios',
                    firstCellName = 'Titel',
                    emptyMessage:any = {};
                emptyMessage[firstCellName] = firstCellValue;
                this.rows = [emptyMessage];
  }
 
  ngOnInit(): void {
    let now = new Date();
    this.month = now.getMonth() + 1;
    this.year = now.getFullYear();
    

    //llamamos a la carga de datos
    this.dashboardadminservice.getCuestionarios().subscribe(
      response => {
        
        this.ng2TableData = response.data;
        this.length = this.ng2TableData.length;
        let searchInput = jQuery('#table-search-input, #search-countries');
        searchInput
          .focus((e) => {
          jQuery(e.target).closest('.input-group').addClass('focus');
        })
          .focusout((e) => {
          jQuery(e.target).closest('.input-group').removeClass('focus');
        });
        this.onChangeTable(this.tableconfig);
      },
      error => {
          this.errorMessage = <any>error;
					if(this.errorMessage !== null){
                                          
                        Messenger().post({
                            message: 'Ha ocurrido un error en la petición.' + this.errorMessage,
                            type: 'error',
                            showCloseButton: true
                        });
					
					}
      }
    );


    
  }
  changePage(page: any, data: Array<any> = this.ng2TableData): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  changeSort(data: any, tableconfig: any): any {
    if (!tableconfig.sorting) {
      return data;
    }

    let columns = this.tableconfig.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  changeFilter(data: any, tableconfig: any): any {
    
    if (!tableconfig.filtering) {
      return data;
    }
console.log("a filtrar data");
console.log(data);
    let filteredData: Array<any> = data.filter((item: any) =>
      item[tableconfig.filtering.columnName].match(this.tableconfig.filtering.filterString));

    return filteredData;
  }

  onChangeTable(tableconfig: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    if (tableconfig.filtering) {
      Object.assign(this.tableconfig.filtering, tableconfig.filtering);
    }
    if (tableconfig.sorting) {
      Object.assign(this.tableconfig.sorting, tableconfig.sorting);
    }

    let filteredData = this.changeFilter(this.ng2TableData, this.tableconfig);
    let sortedData = this.changeSort(filteredData, this.tableconfig);
    this.rows = page && tableconfig.paging ? this.changePage(page, sortedData) : sortedData;
    console.log("rows cambiadas");
    console.log(this.rows);
    this.length = sortedData.length;
  }
}