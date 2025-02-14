import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from '../../Core/interfaces/i-user';
import { SAuthService } from '../../Core/services/s-auth.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [Toast, TranslateModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
  providers: [MessageService]
})
export class AllUsersComponent implements OnInit, OnDestroy {
  Users: IUser[] = [];
  User: IUser = { } as IUser;
  private destroy$ = new Subject<void>();
  constructor(
    private _SAuthService: SAuthService,
    private _MessageService: MessageService
  ) { }
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this._SAuthService
      .getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.Users = data.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  getUserInfo(id:string){
    this._SAuthService
      .getUserById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.User = data.data ;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  removeUser(id: string) {
    this._SAuthService
      .removeUser(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.Users = this.Users.filter((obj: IUser) => obj.id !== id);
          this._MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User Removed Successfully',
          });
        },
        error: (err) => {
          this._MessageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete User',
          });
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
