import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddUserRequest, UserDTO } from 'src/app/@core/http/users-client';
import { UserService } from 'src/app/@core/services/user.service';
import { userFormGroup } from './user-form.form';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup = new FormGroup(userFormGroup);

  @Input() user: UserDTO = null;

  @Output() addUserEvent: EventEmitter<AddUserRequest> = new EventEmitter<AddUserRequest>();
  @Output() closeFormEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  isValidFormControl(formControlName: string): boolean{
    return this.userForm.get(formControlName).valid &&
      (this.userForm.get(formControlName).touched || this.userForm.get(formControlName).dirty || this.userForm.get(formControlName).updateOn) &&
      this.userForm.get(formControlName).value
  }

  isInvalidFormControl(formControlName: string): boolean{
    return this.userForm.get(formControlName).invalid && (this.userForm.get(formControlName).touched || this.userForm.get(formControlName).dirty)
  }

  closeForm(){
    this.closeFormEvent.emit();
  }

  addUser(){
    const formObject: any = this.userForm.getRawValue();
    const name = formObject?.userName ? formObject.userName : undefined;
    const surname = formObject?.userSurname ? formObject.userSurname : undefined;
    const email = formObject?.userEmail ? formObject.userEmail : undefined;
    const dateOfBirth = formObject?.userDateBirth ? formObject.userDateBirth : undefined;
    const scholarity = formObject?.userScholarity ? formObject.userScholarity : undefined;

    let addUserRequest: AddUserRequest = new AddUserRequest();
    addUserRequest.user = new UserDTO();

    addUserRequest.user.nome = name;
    addUserRequest.user.sobrenome = surname;
    addUserRequest.user.email = email;
    addUserRequest.user.dataNascimento = dateOfBirth;
    addUserRequest.user.escolaridade = scholarity;

    this.addUserEvent.emit(addUserRequest);
  }
}
