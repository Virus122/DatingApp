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
            this.setCurrentUser(user);
          }
        })
      )
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  public register(model:any): Observable<User> {
    return this.httpClient.post<User>(this.accountApi + '/register', model).pipe(
      map((user: User) =>  {
        if(user) {
          this.setCurrentUser(user);
        }
        return user
      })
    )
  }

  public setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}
