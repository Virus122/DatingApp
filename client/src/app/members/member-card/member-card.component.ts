import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined
  buttons: { faIcon: string, baseRouteUrl: string, urlProperty: string }[] = [
    { faIcon : 'user', baseRouteUrl: '/members/', urlProperty: 'userName'},
    { faIcon : 'heart', baseRouteUrl: '', urlProperty: ''},
    { faIcon : 'envelope', baseRouteUrl: '', urlProperty: ''}
  ]

  constructor() { }

  ngOnInit(): void {
  }


  getRouterLink(button: { faIcon: string, baseRouteUrl: string, urlProperty: string }): string {
    const property = button.urlProperty as keyof Member;
    if (this.member && this.member[property]) {
      return button.baseRouteUrl + this.member[property];
    }
    return '/not-found';
  }

}
