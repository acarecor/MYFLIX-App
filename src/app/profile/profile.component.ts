import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
//import { MovieCardComponent } from '../movie-card/movie-card.component';
//import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';

//to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: any = {};
  favoritesMovies: any [] = [];
  movies: any = {};
  favoritesMoviesList: any [] = [];
  

  userData = { username: '', password: '', email: '', birthday: '', };

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackbar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
  
  ) { }

  ngOnInit(): void {
  
    this.getUserInfo();
   
    
  }
  
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      this.userData.username = this.user.username;
      this.userData.email = this.user.email;
      this.userData.birthday = formatDate(this.user.birthday, 'dd-MM-yyyy', 'en-US', 'UTC+0');
      
      this.fetchApiData.getAllMovies().subscribe((response: any) => {
        this.favoritesMovies = response.filter((m: { _id: any }) => this.user.favoritesMovies.indexOf(m._id) >= 0)
    });
  })}

    changeInfo(): void {
      this.dialog.open(UserUpdateComponent, {
        width: '280px'
      });
    }

    
  }

  
  


   



 





