import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  navbarOpen = false;

  constructor(private userService: UserService, private authService: AuthService) { }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  private login() {
    this.userService.login();
  }

  private logout() {
    this.userService.logout();
  }

  private isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
