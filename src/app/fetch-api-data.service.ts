import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app

const apiUrl = 'https://myflix-movies-2a93844126ef.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
// Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient){}

//API call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl+ 'users', userDetails).pipe(
      catchError(this.handleError)
    );
    }

//API call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl+ 'login', userDetails).pipe(
      catchError(this.handleError)
    );
    }

  // API call to get all Movies endpoint
  getAllMovies() : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData),catchError(this.handleError) 
    );
  }

// API call to get one Movie by title  
  getOneMovie(title: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData), catchError(this.handleError) 
    );
  }
//API call to get Director details from a movie  
  getDirector(directorName: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' +  directorName , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData), catchError(this.handleError) 
    );
  }
//API  call to get Genre details  from a  movie  
  getGenre(genreName: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' +  genreName , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData), catchError(this.handleError) 
    );
  }
// API call to get information from user 
  getUser() : Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log(username);
    return this.http.get(apiUrl + 'users/' +  username , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData), catchError(this.handleError) 
    );
  }

// API call to get list of favorites movies from the user
  getFavoritesMovies() : Observable<any> {
    const user = JSON.stringify(localStorage.getItem("user") || '{}');
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return this.http.get(apiUrl + 'users/'+ username, {headers: new HttpHeaders(
      {
        'Content-Type':'application/json',
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData), map((data)=> data.favoritesMovies), catchError(this.handleError) 
    );
  }

// API call to update information from the user
  editUser(updatedUser:any) : Observable<any> {
    
    const token = localStorage.getItem('token');
    //const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = localStorage.getItem('username');
    //console.log(username);
    return this.http.put(apiUrl + 'users/' +  username , updatedUser, {headers: new HttpHeaders(
      {
        //'Content-Type':'application/json',
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData), catchError(this.handleError) 
    );
  }

// API call to delete the account from the user
  deleteUser() : Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const user = JSON.stringify(localStorage.getItem('user') || '{}');
    return this.http.delete(apiUrl + 'users/' + username , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    ), responseType: "text",
  }).pipe(map(this.extractResponseData), catchError(this.handleError) 
    );
  }

  // API call to add a Movie to a  Favorites list of the user
  addFavoriteMovie(movieId: string) : Observable<any> {
    const user = JSON.stringify(localStorage.getItem("user") || '{}');
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, {},  { headers: new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: 'Bearer ' + token,
    }),
      
    }).pipe(map(this.extractResponseData), catchError(this.handleError) 
    );
  }
  // API call to remove a Movie from the Favorites list  of the user
  removeFavoriteMovie(movieId: string) : Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem("username");
    return this.http.delete(apiUrl + 'users/' +  username + '/movies/' + movieId, {headers: new HttpHeaders(
      {
        //'Content-Type':'application/json',
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData), catchError(this.handleError) 
    );
  }

// Non-typed response extraction
  private extractResponseData(res: any): any
  {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any{
    if(error.error instanceof ErrorEvent) {
      console.error('Some error ocurred:', error.error.message);
    } else {
      console.log(error);
      console.error(
        `Error Status code ${error.status},` + 
        `Error body is: ${error.error}`
      );
    }
    return throwError(() => new Error(
      'Something bad happened; please try again later.'
    ));
  }
}

