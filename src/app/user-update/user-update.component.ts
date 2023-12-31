import { Component, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

//to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  user: any = {};
  updatedUser: any = {};

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
    public dialogRef: MatDialogRef<UserUpdateComponent>
  ) {}

  ngOnInit(): void {}
  /**
   * this function allows the user to update the information
   */
  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe(
      (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('username', userData.username);
        window.location.reload();
        this.snackbar.open('User Info  updated', 'OK', {
          duration: 2000,
        }),
          console.log(this.updatedUser);
      },
      (response) => {
        console.log(response.status);
        this.snackbar.open('Something wrong', 'OK', {
          duration: 2000,
        });
      }
    );
  }
  /**
   * This function allows the user to delete his account.
   */
  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser().subscribe((response) => {
        localStorage.clear();
        this.dialogRef.close();
        this.router.navigate(['welcome']);
        this.snackbar.open('Your account was deleted', 'OK', {
          duration: 2000,
        });
      });
    }
  }
}
