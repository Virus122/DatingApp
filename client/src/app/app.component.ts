import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string = 'Dating App';

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }



  private setCurrentUser(): void {
    const userString:string | null = localStorage.getItem('user')
    if(!userString) return;
    const user: User = JSON.parse(userString)
    this.accountService.setCurrentUser(user)
  }
}
