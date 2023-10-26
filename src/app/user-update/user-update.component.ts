import { Component, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';


//to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  user: any = " ";
  favoritesMovies: any [] = [];
  updatedUser: any = {};
  //movies: any[] = [];

  @Input()
  userData = {
    username: ' ',
    password: ' ',
    email: ' ',
    birthday: '',
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackbar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<UserUpdateComponent>,
 
  ) { }

  ngOnInit(): void {
   
  }

  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((updatedUser) => {
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('username', updatedUser.username);
      //this.user = response;
      console.log(updatedUser);
      window.location.reload();
      //this.dialogRef.close(); //this will close the modal on success!
      this.snackbar.open('User Info  updated', 'OK', {
        duration:2000});
      
    }, (response)=> {
      console.log(response.status);
      this.snackbar.open('Something wrong', 'OK', {
        duration:2000});
    })
  }
   

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser().subscribe((response) => {
        localStorage.clear();
        this.dialogRef.close();
        this.router.navigate(['welcome']);
        this.snackbar.open('Your account was deleted', 'OK', {
          duration:2000});
      });
    }
  }
}

