import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app

const apiUrl = 'https://myflix-movies-2a93844126ef.herokuapp.com/movies';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient){
  }
  //User registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl+ 'users', userDetails).pipe(
      catchError(this.handleError)
    );
    }

//User login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl+ 'login', userDetails).pipe(
      catchError(this.handleError)
    );
    }

  //Api call to get all Movies from myFlix API
  getAllMovies() : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData),catchError(this.handleError) 
    );
  }
  private extractResponseData(res: Response): any
  {
    const body = res;
    return body || { };
  }

  getOneMovies(title: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData), catchError(this.handleError) 
    );
  }

  getDirector(directorName: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' +  directorName , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData), catchError(this.handleError) 
    );
  }

  getGenre(genreName: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' +  genreName , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData), catchError(this.handleError) 
    );
  }

  getUser(username: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' +  username , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData), catchError(this.handleError) 
    );
  }

  getFavoritesMovies(username: string, movieID: any) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' +  username + 'movies/' + movieID, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData), catchError(this.handleError) 
    );
  }

  private handleError(error: HttpErrorResponse): any{
    if(error.error instanceof ErrorEvent) {
      console.error('Some error ocurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` + 
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}

