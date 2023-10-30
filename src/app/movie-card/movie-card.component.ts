import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favMovies: any = [];
  movie: any = '';

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }
  //fetch movie data from the Api
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) =>{
      this.movies = response;
      return this.movies;
    });
  }

  getFavorites(): void {
    this.fetchApiData.getFavoritesMovies().subscribe((response:any) => {
      this.favMovies = response;
      console.log(this.favMovies)
      return this.favMovies
    })
  }

  toggleFavMovie(movieId: string): void {
    if(!this.favMovies.includes(movieId)) {
    //if(this.favMovies.toString().indexOf(movieId) > -1){
      this.fetchApiData.addFavoriteMovie(movieId).subscribe((response: any)=> {
        console.log(response);
        this.favMovies = response.favoritesMovies;
        this.snackbar.open('Movie added', 'OK', {duration:2000});
    })}
    //error: (error)=> {
      //console.log(error);
       //this.snackbar.open(error, 'OK', {duration: 2000});}
     else {
  this.fetchApiData.removeFavoriteMovie(movieId).subscribe((response:any)=>{
    console.log(response);   
    this.favMovies = response.favoritesMovies;
    this.snackbar.open('Movie removed from favorite', 'OK', {duration:2000});
   }) }
  }
  // error:(e)=> {
    //console.log(e);
    //this.snackbar.open(e, 'OK', {duration: 2000});
  
  //getFavorites(): void{
    //this.fetchApiData.getFavoritesMovies().subscribe((response:any)=> {
      //if(response){
      //this.favoritesMovies = response;
      //return this.favoritesMovies;
      //} else {
        //return [];
     // }
   //});
  //}    

  //addMovieToFav(movieId: string): void {
    //this.fetchApiData.addFavoriteMovie(movieId).subscribe((response: any)=> {
      //this.favMovies = response;
      //console.log(this.favMovies);
      //this.getFavorites();
      //return this.favMovies;
    //});
  //}

  //removeMovieFromFav(movieId:string): void {
   // this.fetchApiData.removeFavoriteMovie(movieId).subscribe((response:any)=>{
   //   this.favMovies = response;
     // console.log(this.favMovies);
      //return this.favMovies;
      
    //})
  //}

  //isFavorite(_id: string): boolean {
   
    //if(this.favoritesMovies.toString().indexOf(id) > -1){
    //  if(this.favMovies.indexOf(_id) >= 0){
      //return true;
    //} else {
      //return false;
    //}
//}


  //this function open the  dialog when synopsis button is clicked
  openMovieDescriptionDialog(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: title,
        content: description,
      }
    });
    }
  
      openGenreDescriptionDialog(genreName:string, genre: string): void {
      this.dialog.open(MovieDetailsComponent, {
        data: {
          title: genreName,
          content: genre,
        }
       });
      }
      openDirectorBioDialog(directorName:string, directorBio: string): void {
        this.dialog.open(MovieDetailsComponent, {
          data: {
            title: directorName,
            content: directorBio,
          }
        });
      }
}

