import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/_services/members.service';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  public member: Member | undefined;
  galleryOptions: NgxGalleryOptions[] = []
  galleryImages: NgxGalleryImage[] = []

  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

  private getImages(): NgxGalleryImage[] {
    if(!this.member) return [];
    const imageUrls: NgxGalleryImage[] = [];
    this.member.photos.forEach((photo: Photo) => {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    })
    return imageUrls
  }

  private loadMember(): void {
    const username = this.route.snapshot.paramMap.get('username')
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: (member: Member) => {
        this.member = member;
        this.galleryImages = this.getImages();
      }
    })
  }

}
