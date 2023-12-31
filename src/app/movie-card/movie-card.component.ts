import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favMovies: any = [];
  movie: any = '';

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Get all movies from the Api
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      return this.movies;
    });
  }

  /**
   * Get list of the  favorites movies from user
   */
  getFavorites(): void {
    this.fetchApiData.getFavoritesMovies().subscribe((response: any) => {
      this.favMovies = response;
      console.log(this.favMovies);
      return this.favMovies;
    });
  }

  /**
   * toggle function that add or remove movies from favorites list 
   * @param movieId 
   */
  toggleFavMovie(movieId: string): void {
    //conditional  if the movieId is not in the favorite array , then it can be added 
    if (!this.favMovies.includes(movieId)) {
      this.fetchApiData.addFavoriteMovie(movieId).subscribe((response: any) => {
        console.log(response);
        this.favMovies = response.favoritesMovies;
        this.snackbar.open('Movie added to favorites', 'OK', {
          duration: 2000,
        });
      });
    } else {
      this.fetchApiData
        .removeFavoriteMovie(movieId)
        .subscribe((response: any) => {
          console.log(response);
          this.favMovies = response.favoritesMovies;
          this.snackbar.open('Movie removed from favorites', 'OK', {
            duration: 2000,
          });
        });
    }
  }

  /**
   * this function opens the dialog with the movie description (synopsis) when the button is clicked
   * @param title 
   * @param description 
   */
  openMovieDescriptionDialog(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: title,
        content: description,
      },
    });
  }

  /**
   * this function open the  dialog with genre description when  button is clicked
   * @param genreName 
   * @param genre 
   */
  openGenreDescriptionDialog(genreName: string, genre: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: genreName,
        content: genre,
      },
    });
  }

  /**
   * this function open the  dialog with director bio when button is clicked
   * @param directorName 
   * @param directorBio 
   */
  openDirectorBioDialog(directorName: string, directorBio: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: directorName,
        content: directorBio,
      },
    });
  }
}
