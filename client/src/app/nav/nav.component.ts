import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

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
    private toastrService: ToastrService
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
        next: () => this.router.navigateByUrl('/members'),
        error: error => {
          let errorMessage = (error.error.type) ? error.error.title : error.error
          this.toastrService.error(errorMessage)
        }
      })
  }

  public logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

}
