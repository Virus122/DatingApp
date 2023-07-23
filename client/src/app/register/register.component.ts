import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {}
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  public register(): void {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error => console.log(error)
    })
  }

  public cancel(): void {
    this.cancelRegister.emit(false);
  }
}
