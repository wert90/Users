import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddUserRequest, AddUserResponse, GetUserResponse, RemoveUserRequest, RemoveUserResponse, UpdateUserRequest, UpdateUserResponse, UsersClient } from "../http/users-client";

@Injectable()
export class UserService{
    constructor(private userClient: UsersClient){}

    getUsers(id: number | undefined, name: string | undefined, surname: string | undefined) : Observable<GetUserResponse>{
        const getUsers$: Observable<GetUserResponse> = this.userClient.userGET(id, name, surname);
        return getUsers$;
    }

    addUser(addUserRequest: AddUserRequest) : Observable<AddUserResponse>{
        const addUser$: Observable<AddUserResponse> = this.userClient.userPOST(addUserRequest);
        return addUser$;
    }

    updateUser(updateUserRequest: UpdateUserRequest) : Observable<UpdateUserResponse>{
        const updateUser$: Observable<UpdateUserResponse> = this.userClient.userPUT(updateUserRequest);
        return updateUser$;
    }

    removeUser(removeUserRequest: RemoveUserRequest): Observable<RemoveUserResponse>{
        const deleteUser$: Observable<RemoveUserResponse> = this.userClient.userDELETE(removeUserRequest);
        return deleteUser$;
    }
}