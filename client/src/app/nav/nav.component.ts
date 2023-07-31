import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public model: any = {}
  constructor(
    public accountService: AccountService,
    private router: Router,
  ) { }

  public pages: { name: string, link: string }[] = [
    {name: 'members', link: '/members'},
    {name: 'lists', link: 'lists'},
    {name: 'Messages', link: 'Messages'}
  ]

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
        next: () => {
          this.router.navigateByUrl('/members')
        }
      })
  }

  public logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

}
