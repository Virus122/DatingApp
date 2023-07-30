import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { PaginatedResult, Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';
import { UserParams } from 'src/app/models/userParams';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  public members: Member[] = [];
  public pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  genderList = [ {value: 'male', display: 'Males' }, {value: 'female', display: 'Females'}]

  constructor(
    private memberService: MembersService,
  ) {
    this.userParams = this.memberService.getUserParams();
   }

  ngOnInit(): void {
    this.loadMembers();
  }

  public loadMembers() {
    if(this.userParams)  {
      this.memberService.setUserParams(this.userParams);
      this.memberService.getMembers(this.userParams).subscribe({
        next: (response: PaginatedResult<Member[]>) => {
          if (response.result && response.pagination) {
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }
  }

  public resetFilters():void {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  public pageChanged(event: any): void {
    if (this.userParams && this.userParams?.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.memberService.setUserParams(this.userParams);
      this.loadMembers();
    }
  }
}
