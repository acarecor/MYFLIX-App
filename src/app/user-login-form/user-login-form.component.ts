import { Component, OnInit, Input } from '@angular/core';
//to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
//brings in the API calls 
import { UserRegistrationService} from '../fetch-api-data.service';
//to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit  {
  @Input() 
  userData = 
  { 
   username: '',
   password: '',
 };

 constructor(
  public fetchApiData: UserRegistrationService,
  public dialogRef :MatDialogRef <UserLoginFormComponent>,
  public snackbar: MatSnackBar
) { }

ngOnInit(): void {
  
}

//this function is responsible for sending the form inputs to the backend
loginUser(): void {
this.fetchApiData.userLogin(this.userData).subscribe((response)=> {
  //logic for a successful login registration 
  localStorage.setItem('user', JSON.stringify(response.user));
  localStorage.setItem('token', response.token);

  this.dialogRef.close(); //this will close the modal on success!
  console.log(response);
  this.snackbar.open('user login successfull', 'OK', {
    duration:2000
  });
}, (response)=> {
  console.log(response)
  this.snackbar.open(response, 'OK', {
    duration:2000
  });
});
}




}