import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  users = new Array<User>();
  error : number = 0;
  isInvalid: boolean = false;
  isFound: boolean = false;
  isEnabled: boolean = false;
  code!: string;

  constructor(/*private authService : AuthService, private router : Router*/ private authService: AuthService,
  private router: Router,
  private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.usersList().subscribe({
      next: (data) => {
        this.users = data;
        console.log(this.users);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

 /* onLoggedIn() {
      this.authService.signIn(this.user).subscribe({
        next: (response) => {
          let jwt = response.headers.get('Authorization')!;
          this.authService.saveToken(jwt);
          this.authService.isLoggedIn = true;
          this.router.navigate(['/Film']);
      },
      error: (err: any) => {
        this.error = 1;
        console.log(err);
      }
    });
  }*/
  onLoggedIn() {
    if (this.users.some((u) => u.username === this.user.username)) {
      this.isFound = true;
    } else {
      this.isInvalid = true;
    }
    this.authService.signIn(this.user).subscribe({
      next: (response) => {
        let jwt = response.headers.get('Authorization')!;
        this.authService.saveToken(jwt);
        this.authService.isLoggedIn = true;
        this.router.navigate(['/Film']);
      },
      error: (err: any) => {

        this.isEnabled = true;
      },
    });
  }
  onActivate() {
    this.userService.activate(this.user.username, this.code).subscribe(
      (user) => {
        if (user != null) {
          this.authService.signIn(this.user).subscribe({
            next: (response) => {
              let jwt = response.headers.get('Authorization')!;
              this.authService.saveToken(jwt);
              this.authService.isLoggedIn = true;
              this.router.navigate(['/Film']);
            },
            error: (err: any) => {
              console.error(err);
              this.isEnabled = true;
            },
          });
        } else {
          alert('Wrong activation code. Please try again.');
        }
      },
      (error) => {
        console.error(error);
        alert('Failed to activate the user. Please try again.');
      }
    );
  }
  
  
}
