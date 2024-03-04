import { HttpClient,HttpErrorResponse} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { Injectable } from '@angular/core';
import { Observable,catchError, throwError } from 'rxjs';
import { MyInterface } from '../my-interface';


@Injectable({
  providedIn: 'root',
})

export class AnimalsService {
  private apiUrl = 'http://127.0.0.1:8000/api/animals';
  constructor(private http: HttpClient) {} 

  createAnimal(data: any): Observable<any> {

    return this.http.post(`${this.apiUrl}`, data).pipe(
      catchError((error) => {
        console.error('Error creating animal:', error);
        throw error;
      })
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
