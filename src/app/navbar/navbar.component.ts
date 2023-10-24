import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
 constructor(
 public router: Router
 ){}

 
  toMovies(): void {
    this.router.navigate(['movies']);
  }
  //this function open the the dialog when login button is clicked
  toProfile(): void {
    this.router.navigate(['users']);
  }
 
}
