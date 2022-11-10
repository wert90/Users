import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserTableRowComponent } from './components/user-table/user-table-row/user-table-row.component';
import { UserService } from './@core/services/user.service';
import { UsersClient, USERS_API_URL } from './@core/http/users-client';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent,
    UserTableRowComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    UsersClient,
    UserService,
    {
      provide: USERS_API_URL,
      useValue: environment.usersApiUrl
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
