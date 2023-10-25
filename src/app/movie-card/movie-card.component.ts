import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
  }
  //fetch movie data from the Api
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) =>{
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }
  //this function open the  dialog when synopsis button is clicked
  openMovieDescriptionDialog(synopsis: string): void {
  this.dialog.open(MovieDetailsComponent, {
    data: {
      title: "Description",
      content: synopsis,
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
