import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountApi = environment.apiUrl.account;

  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  public login(model: any): Observable<void> {
    return this.httpClient.post<User>(this.accountApi + '/login', model).pipe(
        map((response: User) => {
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })
      )
  }

  public setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  public register(model:any): Observable<User> {
    return this.httpClient.post<User>(this.accountApi + '/register', model).pipe(
      map((user: User) =>  {
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user
      })
    )
  }
}
