import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTicketComponent } from './components/ticket/add-ticket/add-ticket.component';
import { TicketListComponent } from './components/ticket/ticket-list/ticket-list.component';
import {MenuComponent} from './menu/menu.component';
import {LoginComponent} from './login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {provideHttpClient} from '@angular/common/http';
import {AuthGuard} from './guard/auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {ProjectListComponent} from './components/project/project-list/project-list.component';
import {AddProjectComponent} from './components/project/add-project/add-project.component';
import {MatInput} from '@angular/material/input';
import {AddUserComponent} from './components/User/add-user/add-user.component';
import {UserListComponent} from './components/User/user-list/user-list.component';
import {AddClientComponent} from './components/client/add-client/add-client.component';
import {ClientListComponent} from './components/client/client-list/client-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    AddTicketComponent,
    TicketListComponent,
    AddUserComponent,
    UserListComponent,
    AddProjectComponent,
    ProjectListComponent,
    AddClientComponent,
    ClientListComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListItem,
    MatNavList,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatPaginator,
    MatSort,
    MatSortHeader,
    MatInput,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
