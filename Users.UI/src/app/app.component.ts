import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddUserRequest, GetUserResponse, RemoveUserRequest, UpdateUserRequest, UserDTO } from './@core/http/users-client';
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
  selectedUser: UserDTO | undefined = undefined;
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

  updateUser(updateUserRequest: UpdateUserRequest){
    this.userService.updateUser(updateUserRequest).subscribe({
      next: (res) =>{
        const userIndex = this.users.findIndex(u => u.id === res.user.id);
        this.users[userIndex] = res.user;
      }
    })
  }

  setEditUser(user: UserDTO){
    this.selectedUser = user;
    this.showForm = true;
  }

  deleteUser(user: UserDTO){
    let removeUserRequest: RemoveUserRequest = new RemoveUserRequest();
    removeUserRequest.user = user;

    this.userService.removeUser(removeUserRequest).subscribe({
      next: (res) =>{
        this.users = this.users.filter(u => u.id !== res.user.id);
      }
    })
  }
}
