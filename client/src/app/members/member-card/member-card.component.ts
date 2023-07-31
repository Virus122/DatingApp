import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined
  buttons: { faIcon: string, baseRouteUrl: string, buttonProperty: string }[] = [
    { faIcon : 'user', baseRouteUrl: 'members/', buttonProperty: 'userName'},
    { faIcon : 'heart', baseRouteUrl: '', buttonProperty: 'addLike'},
    { faIcon : 'envelope', baseRouteUrl: '', buttonProperty: ''}
  ]

  constructor(
    private memberService: MembersService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  makeAction(button: { faIcon: string, baseRouteUrl: string, buttonProperty: string }): void {
    switch(button.buttonProperty) {
      case 'userName':
        this.router.navigateByUrl(`/${button.baseRouteUrl}${this.member?.userName}`)
        break;
      case 'addLike':
        this.addLike()
    }
  }

  public addLike(): void {
    if (!this.member) return;
    this.memberService.addLike(this.member.userName).
      subscribe({
        next: () => {
          if(!this.member) return;
          let nameToShow = (this.member.knownAs)?this.member.knownAs:this.member.userName;
          this.toastrService.success(`You have liked ${nameToShow}`);
        }
      })
  }

}
