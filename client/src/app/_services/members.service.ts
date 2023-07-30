import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { PaginatedResult } from '../models/pagination';
import { User } from '../models/user';
import { UserParams } from '../models/userParams';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private usersUrl = environment.apiUrl.users;
  members: Member[] = [];
  private memberCache = new Map();
  user: User | undefined;
  userParams: UserParams | undefined;



  constructor(
    private accountService: AccountService,
    private httpClient: HttpClient,
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      }
    })
   }

  public getUserParams(): UserParams | undefined {
    return this.userParams;
  }

  public setUserParams(userParams: UserParams): void {
    this.userParams = userParams
  }

  public resetUserParams(): UserParams | undefined {
    if(this.user) {
      this.userParams = new UserParams(this.user)
      return this.userParams;
    }
    return
  }

  public getMembers(userParams: UserParams): Observable<PaginatedResult<Member[]>> {

    const response = this.memberCache.get(Object.values(userParams).join('-'));

    if (response) return of(response)

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge)
    params = params.append('maxAge', userParams.maxAge)
    params = params.append('gender', userParams.gender)
    params = params.append('orderBy', userParams.orderBy)
    
    return this.getPaginatedResult<Member[]>(this.usersUrl, params).pipe(
      map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response)
        return response;
      })
    )
    
  }

  public getMember(username: string): Observable<Member> {
    const member = [...this.memberCache.values()]
      .reduce((arr, element) => arr.concat(element.result), [])
      .find((member: Member) => {
        member.userName === username
      })
      if (member) return of(member)

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

  public setMainPhoto(photoId: number) {
    return this.httpClient.put(`${this.usersUrl}/set-main-photo/${photoId}`, {})
  }

  public deletePhoto(photoId: number) {
    return this.httpClient.delete(`${this.usersUrl}/delete-photo/${photoId}`)
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number): HttpParams {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize)
    
    return params;
  }

  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>;
    return this.httpClient.get<T>(url, { observe: 'response', params}).pipe(
      map( response => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    )
  }

}
