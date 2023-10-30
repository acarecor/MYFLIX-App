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
  user : any  = {};
  favoritesMovies: any[] = [];
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
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavorites(): void {
    this.fetchApiData.getFavoritesMovies().subscribe((response:any) => {
      this.favoritesMovies = response.favoritesMovies;
      console.log(this.favoritesMovies)
      return this.favoritesMovies
    })
  }
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

  addMovieToFav(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((response: any)=> {
      this.favoritesMovies = response;
      console.log(this.favoritesMovies);
      this.getFavorites();
      return this.favoritesMovies;
    });
  }

  removeMovieFromFav(movieId:string): void {
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe((response:any)=>{
      this.favoritesMovies = response;
      console.log(this.favoritesMovies);
      return this.favoritesMovies;
      
    })
  }

  isFavorite(id: string): boolean {
    if(this.favoritesMovies.toString().indexOf(id) > -1){
      return true;
    } else {
      return false;
    }
}


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

