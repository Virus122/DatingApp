import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  public members$: Observable<Member[]> | undefined

  constructor(
    private memberService: MembersService
  ) { }

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
  }
}
