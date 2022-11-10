import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDTO } from 'src/app/@core/http/users-client';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html'
})
export class UserTableComponent implements OnInit {

  tableHeaderValues: string[] = ["#", "Nome", "Sobrenome", "Email", "Data de Nasc.", "Escolaridade", "", ""];
  @Input() users: UserDTO[] = [];
  @Output() editUserEvent: EventEmitter<UserDTO> = new EventEmitter<UserDTO>();
  @Output() deleteUserEvent: EventEmitter<UserDTO> = new EventEmitter<UserDTO>();

  constructor() { }

  ngOnInit(): void {
  }

  editUser(user: UserDTO){
    this.editUserEvent.emit(user);
  }

  deleteUser(user: UserDTO){
    this.deleteUserEvent.emit(user);
  }
}
