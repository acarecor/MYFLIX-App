import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
 constructor(
 public router: Router,
 public snackbar: MatSnackBar,
 ){}

 
  toMovies(): void {
    this.router.navigate(['movies']);
  }
  //this function open the the dialog when login button is clicked
  toProfile(): void {
    this.router.navigate(['users']);
  }
 
  onLogout(): void {
    if (confirm('Are you sure you want to logout')){
      localStorage.clear();
      this.router.navigate(['welcome']);
        this.snackbar.open('Good bye', 'OK', {
          duration:2000});
    }
  }
}
