import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketListComponent} from './components/ticket/ticket-list/ticket-list.component';
import {AddTicketComponent} from './components/ticket/add-ticket/add-ticket.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guard/auth.guard';
import {MenuComponent} from './menu/menu.component';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './components/User/user-list/user-list.component';
import {ProjectListComponent} from './components/project/project-list/project-list.component';
import {ClientListComponent} from './components/client/client-list/client-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'menu', component: MenuComponent, canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'tickets', component: TicketListComponent },
      { path: 'ticket', component: AddTicketComponent },
      { path: 'users', component: UserListComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'clients', component: ClientListComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
