import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private usersUrl = environment.apiUrl.users;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.usersUrl);
  }

  public getMember(username: string): Observable<Member> {
    return this.httpClient.get<Member>(this.usersUrl + `/${username}`);
  }

}
