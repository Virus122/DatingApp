import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private toastrService: ToastrService
  ) {

  }
  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map((user: User | null) => {
        if(user) return true;
        else {
          this.toastrService.error('You shall not pass!')
          return false;
        }
      })
    )
  }
  
}
