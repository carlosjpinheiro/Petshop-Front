import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiServerUrl}/cliente`)
    .pipe(
      catchError(this.handleError)
    );
  }

  public addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiServerUrl}/cliente/add`, cliente)
    .pipe(
      catchError(this.handleError)
    );
  }

  public updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiServerUrl}/cliente/update/${cliente.id}`, cliente)
    .pipe(
      catchError(this.handleError)
    );
  }

  public deleteCliente(clienteId: string | undefined): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/cliente/delete/${clienteId}`,{responseType: 'text'})
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent){  //tratemento de erro relacionado ao client-side ou internet
      console.error('Ocorreu um erro: ' + error.error.message);      
    } else {
      console.error(
        `Backend retornou o codigo ${error.status},` +
        `Body: ${error.error}`
      );
    }
    return throwError(()=> new Error('Algo errado aconteceu, por favor tente novamente depois.'))
  } 

}
