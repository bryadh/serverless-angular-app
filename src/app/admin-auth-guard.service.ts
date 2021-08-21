import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(
    private auth: AuthService,
    private userService: UserService
    ) { }

  canActivate(): Observable<boolean> {
    // Firebase implementatio changed
    // Admin auth guard not working anymore
    return of<boolean>(false);
  }
}
