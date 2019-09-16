import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  statusLog: boolean;
  name: string;
  
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.currentStatusLog.subscribe(value => {
      if(this.authService.isLoggedIn()) {
        this.statusLog = true;
        this.name = this.authService.getUserPayload().login;
      } else {
        this.statusLog = value;
      }
    });
  }

  logOut() {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
    this.authService.changeStatusLog(false);
  }

}
