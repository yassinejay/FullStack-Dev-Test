import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';
import { Installation } from './installation.model';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Company } from '../company/company.model';
import { Customer } from '../customer/customer.model';


@Injectable({
  providedIn: 'root'
})
export class InstallationService {
    private url = environment.apiBase;
  
    constructor(private http: HttpClient, private router: Router) { 
    }
    
    getInstallations(): Observable<Installation[]> {
      return this.http.get<Installation[]>(`${this.url}/installations`).pipe(
        map((data: any[]) =>
          data.map(
            (item: any) =>
              new Installation(
                item.id,
                item.address,
                item.installed_at,
                item.panels_number,
                item.kind,
                item.panels_identification,
                new Company(item.company.id, item.company.name, item.company.siren),
                new Customer(item.customer.id, item.customer.name, item.customer.email, item.customer.phone_number)
                )
          )
        )
      );
    }

    getInstallation(id: number) {
      return  this.http.get(`${this.url}/installations/${id}`)
    }

    createInstallation(installation: Installation): Observable<Installation> {
      let errorMsg: string;
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.post<Installation>(`${this.url}/installations`, JSON.stringify(installation), httpOptions).pipe(
        catchError(error => {
          if (error.error instanceof ErrorEvent) {
              errorMsg = `Error: ${error.error.message}`;
          } else if (error.status == 201) {
            this.router.navigate(['/installations']);
          } else {
              errorMsg = this.getServerErrorMessage(error);
              window.alert(errorMsg);

          }
          return throwError(errorMsg);
        })
      );
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {   
      switch (error.status) {
          case 422: {
              return `Not Found: ${error.error.errors}`;
          }
          case 403: {
              return `Access Denied: ${error.error.errors}`;
          }
          case 500: {
              return `Internal Server Error: ${error.error.errors}`;
          }
          default: {
              return `Unknown Server Error: ${error.error}`;
          }
      }
  }
}

