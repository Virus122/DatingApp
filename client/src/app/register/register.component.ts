import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private accountService: AccountService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  public register(): void {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error => {
        let errorMessage = (error.error.type) ? error.error.title : error.error
        this.toastrService.error(errorMessage)
      }
    })
  }

  public cancel(): void {
    this.cancelRegister.emit(false);
  }
}
