import { Component, Input, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/@core/http/users-client';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html'
})
export class UserTableComponent implements OnInit {

  tableHeaderValues: string[] = ["#", "Nome", "Sobrenome", "Email", "Data de Nasc.", "Escolaridade"];
  @Input() users: UserDTO[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
