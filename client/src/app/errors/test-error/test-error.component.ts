import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {


  private buggyUrl = environment.apiUrl.buggy;
  private accountUrl = environment.apiUrl.account;
  private requestUrl: string = '';
  validationErrors: string[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  public handleError(errorCode: number, validation?: boolean): void {
    switch (errorCode) {
      case 404: {
        this.requestUrl = this.buggyUrl + '/not-found';
        this.httpClient.get(this.requestUrl).subscribe({
          next: response => console.log(response),
          error: error => console.log(error)
        })
        break;
      }
      case 400: {
        if(validation) {
          this.requestUrl = this.accountUrl + '/register';
          this.httpClient.post(this.requestUrl, {}).subscribe({
            next: response => console.log(response),
            error: error => {
              console.log(error)
              this.validationErrors = error;
            }
          })
          
        } else {
          this.requestUrl = this.buggyUrl + '/bad-request';
          this.httpClient.get(this.requestUrl).subscribe({
            next: response => console.log(response),
            error: error => console.log(error)
          })
        }
        break;
      }
      case 500: {
        this.requestUrl = this.buggyUrl + '/server-error';
        this.httpClient.get(this.requestUrl).subscribe({
          next: response => console.log(response),
          error: error => console.log(error)
        })
        break;
      }
      case 401: {
        this.requestUrl = this.buggyUrl + '/auth';
        this.httpClient.get(this.requestUrl).subscribe({
          next: response => console.log(response),
          error: error => console.log(error)
        })
        break;
      }
    }

  }

}
