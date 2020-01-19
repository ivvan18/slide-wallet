import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './pages/auth/services/auth.service';
import {IUser} from './models/IUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: IUser;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      console.log('User updated: ', user);
      this.user = user;
    });

    this.auth.init();
  }


  navigate(route: string) {
    this.router.navigate([route]);
  }

  onLogoutClicked() {
    this.auth.logout().subscribe(response => {
      console.log('Logout completed: ', response);
      this.router.navigate(['landing']);
    });
  }

  isLoggedIn() {
    return this.auth.isLoggedIn;
  }
}
