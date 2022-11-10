import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddUserRequest, UpdateUserRequest, UserDTO } from 'src/app/@core/http/users-client';
import { UserService } from 'src/app/@core/services/user.service';
import { userFormGroup } from './user-form.form';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit, OnChanges {

  userForm: FormGroup = new FormGroup(userFormGroup);

  @Input() user: UserDTO = null;

  @Output() addUserEvent: EventEmitter<AddUserRequest> = new EventEmitter<AddUserRequest>();
  @Output() updateUserEvent: EventEmitter<UpdateUserRequest> = new EventEmitter<UpdateUserRequest>();
  @Output() closeFormEvent: EventEmitter<any> = new EventEmitter<any>();

  get isEdit(){
    return !!this.user;
  }

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes.user && !this.user && !this.isEdit) {
        this.refreshForm();
      }
      else if (changes.user && this.user && this.isEdit){
        this.refreshForm();

        this.userForm.controls['userName'].setValue(this.user.nome);
        this.userForm.controls['userSurname'].setValue(this.user.sobrenome);
        this.userForm.controls['userEmail'].setValue(this.user.email);
        this.userForm.controls['userDateBirth'].setValue(this.datePipe.transform(this.user.dataNascimento, 'yyyy-MM-dd'));
        this.userForm.controls['userScholarity'].setValue(this.user.escolaridade);
      }
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

  addOrUpdateUser(){
    const formObject: any = this.userForm.getRawValue();
    const name = formObject?.userName ? formObject.userName : undefined;
    const surname = formObject?.userSurname ? formObject.userSurname : undefined;
    const email = formObject?.userEmail ? formObject.userEmail : undefined;
    const dateOfBirth = formObject?.userDateBirth ? formObject.userDateBirth : undefined;
    const scholarity = formObject?.userScholarity ? formObject.userScholarity : undefined;

    if (this.isEdit){
      let updateUserRequest: UpdateUserRequest = new UpdateUserRequest();
      updateUserRequest.user = new UserDTO();
  
      updateUserRequest.user.id = this.user.id;
      updateUserRequest.user.nome = name;
      updateUserRequest.user.sobrenome = surname;
      updateUserRequest.user.email = email;
      updateUserRequest.user.dataNascimento = new Date(dateOfBirth);
      updateUserRequest.user.escolaridade = scholarity;
  
      this.updateUserEvent.emit(updateUserRequest);
    }
    else{
      let addUserRequest: AddUserRequest = new AddUserRequest();
      addUserRequest.user = new UserDTO();
  
      addUserRequest.user.nome = name;
      addUserRequest.user.sobrenome = surname;
      addUserRequest.user.email = email;
      addUserRequest.user.dataNascimento = new Date(dateOfBirth);
      addUserRequest.user.escolaridade = scholarity;
  
      this.addUserEvent.emit(addUserRequest);
    }
  }

  refreshForm(){
    this.userForm.reset();
    this.userForm.updateValueAndValidity();
  }
}
