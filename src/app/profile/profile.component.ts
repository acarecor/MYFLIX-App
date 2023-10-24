import { Component } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';


//to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  
  user : any ={};
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
    
    this.fetchApiData.getUser().subscribe((response: any) =>{
      this.user = response;
      console.log(this.user);
      return this.user;
    });
  }
}
