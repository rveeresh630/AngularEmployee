import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:5066";

var httpLink = {
  getAllEmployee: apiUrl + "/api/employee",
  deleteEmployeeById: apiUrl + "/api/employee",
  getEmployeeDetailById: apiUrl + "/api/employee",
  saveEmployee: apiUrl + "/api/employee"
}
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllEmployee(): Observable<any> {
    return this.webApiService.get(httpLink.getAllEmployee);
  }
  public deleteEmployeeById(model: any): Observable<any> {
   // return this.webApiService.delete(httpLink.deleteEmployeeById + model);
    return this.webApiService.post(httpLink.saveEmployee, model);
  }
  public getEmployeeDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getEmployeeDetailById + '?Id=' + model);
  }
  public saveEmployee(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveEmployee, model);
  }  
}