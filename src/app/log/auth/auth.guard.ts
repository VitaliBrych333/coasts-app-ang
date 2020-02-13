import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Url } from '../../shared/constants/url-enum';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  public canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl(Url.LOGIN);
      this.authService.deleteToken();
      return false;
    }
    return true;
  }
}
