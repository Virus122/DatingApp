import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members: Member[] = []

  private usersUrl = environment.apiUrl.users;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getMembers(): Observable<Member[]> {
    if (this.members.length > 0) return of(this.members);
    return this.httpClient.get<Member[]>(this.usersUrl).pipe(
      map((members: Member[]) => {
        this.members = members;
        return members;
      })
    )
  }

  public getMember(username: string): Observable<Member> {
    const member = this.members.find((member: Member) => member.userName === username)
    if (member) return of(member);
    return this.httpClient.get<Member>(this.usersUrl + `/${username}`);
  }

  public updateMember(member: Member): Observable<void> {
    return this.httpClient.put(this.usersUrl, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member}
      })
    )
  }

}
