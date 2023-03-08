import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pet } from './pet';
import { PetAddCliente } from './petaddcliente';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiServerUrl}/pet`).pipe(
      catchError(this.handleError)
    );
  }

  public addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${this.apiServerUrl}/pet/add`, pet)
    .pipe(
      catchError(this.handleError)
    );
  }

  public addClienteToPet(petaddcliente: PetAddCliente): Observable<Pet>{
    return this.http.post<Pet>(`${this.apiServerUrl}/pet/setcliente`, petaddcliente)
    .pipe(
      catchError(this.handleError)
    );
  }

  public updatePet(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiServerUrl}/pet/update/${pet.id}`, pet)
    .pipe(
      catchError(this.handleError)
    );
  }

  public deletePet(petId: string | undefined): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/pet/delete/${petId}`,{responseType: 'text'})
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
