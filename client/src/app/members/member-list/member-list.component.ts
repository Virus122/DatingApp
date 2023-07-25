import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  public members: Member[] = []

  constructor(
    private memberService: MembersService
  ) { }

  ngOnInit(): void {
    this.loadMembers()
  }

  private loadMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (members: Member[]) => this.members = members
    })
  }

}
