import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public model: any = {}
  constructor(
    public accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.accountService.currentUser$.subscribe({
      error: error => console.log(error)
    })
  }

  public login(): void {
    this.accountService.login(this.model)
      .subscribe({
        next: response => {
          console.log(response)
        },
        error: error => console.log(error)
      })
  }

  public logout(): void {
    this.accountService.logout();
  }

}
