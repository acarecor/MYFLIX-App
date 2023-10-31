import { Component, OnInit, Input } from '@angular/core';
//to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
//brings in the API calls 
import { UserRegistrationService} from '../fetch-api-data.service';
//to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
 @Input() 
 userData = 
 { 
  username: '',
  password: '',
  email: '',
  birthday: ''
};
/**
 * Called when creating an instance of the class
 * @param fetchApiData
 * @param dialogRef
 * @param snackbar
 */


  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef :MatDialogRef <UserRegistrationFormComponent>,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    
  }
  /**
   * this function is responsible for sending the form inputs to the backend
   */
 registerUser(): void {
  this.fetchApiData.userRegistration(this.userData).subscribe((response)=> {
    //logic for a successful user registration goes here(to be implemented)
    console.log(response);
    this.dialogRef.close(); //this will close the modal on success!
    this.snackbar.open('User registration successful', 'OK', {
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
