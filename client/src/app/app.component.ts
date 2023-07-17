import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string = 'Dating App';
  users: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.httpClient.get('https://localhost:7234/api/users')
    .subscribe({
      next: (response: any) => this.users = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }
}
