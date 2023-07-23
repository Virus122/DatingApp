import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  users: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(): void {
    this.registerMode = !this.registerMode;
  }

  private getUsers(): void {
    this.httpClient.get('https://localhost:7234/api/users')
    .subscribe({
      next: (response: any) => this.users = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }

  cancelRegisterMode(event: boolean): void {
    this.registerMode = event;
  }

}
