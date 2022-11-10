import { Component, Input, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/@core/http/users-client';

@Component({
  selector: '[app-user-table-row]',
  templateUrl: './user-table-row.component.html'
})
export class UserTableRowComponent implements OnInit {

  @Input() user: UserDTO | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
