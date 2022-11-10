import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDTO } from 'src/app/@core/http/users-client';

@Component({
  selector: '[app-user-table-row]',
  templateUrl: './user-table-row.component.html'
})
export class UserTableRowComponent implements OnInit {

  @Input() user: UserDTO | undefined = undefined;
  @Output() editUserEvent: EventEmitter<UserDTO> = new EventEmitter<UserDTO>();
  @Output() deleteUserEvent: EventEmitter<UserDTO> = new EventEmitter<UserDTO>();

  constructor() { }

  ngOnInit(): void {
  }

  editUser(){
    this.editUserEvent.emit(this.user);
  }

  deleteUser(){
    this.deleteUserEvent.emit(this.user);
  }
}
