import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddUserRequest, GetUserResponse, UserDTO } from './@core/http/users-client';
import { UserService } from './@core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    'name': new FormControl(null),
    'surname': new FormControl(null)
  });


  title = 'users.ui';
  users: UserDTO[] = [];
  showForm: boolean = false;

  constructor(private userService: UserService){}

  ngOnInit(){
    this.userService.getUsers(undefined, undefined, undefined).subscribe({
      next: (res: GetUserResponse) => {
        this.users = res.users!;
      }
    })
  }

  searchUsers(){
    const formObject: any = this.searchForm.getRawValue();
    const name = formObject?.name ? formObject.name : undefined;
    const surname = formObject?.surname ? formObject.surname : undefined;

    this.userService.getUsers(undefined, name, surname).subscribe({
      next: (res: GetUserResponse) => {
        this.users = res.users!;
      }
    })
  }

  showAddUserForm(){
    this.showForm = true;
  }

  closeForm(){
    this.showForm = false;
  }

  addUser(addUserRequest: AddUserRequest){
    this.userService.addUser(addUserRequest).subscribe({
      next: (res) =>{
        this.users.push(res.user);
      }
    })
  }
}
