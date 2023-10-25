import { Component, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

//to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }
  //fetch movie data from the Api
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      this.userData.username = this.user.username;
      this.userData.email = this.user.email;
      this.userData.birthday = this.user.birthday;
      console.log(this.user.username);
      
    });
  }
}
