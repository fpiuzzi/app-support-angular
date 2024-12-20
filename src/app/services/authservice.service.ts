import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:3000/users';
  public authenticated : boolean =false;
  public username:any;
  public usersexe:any;
  public userrole:any;
  public userDetails: { nom : string; prenom:string; password: string, sexe: string, role: string} | null = null;

  constructor(private http: HttpClient, private router : Router) {
  }

  login(email:string, password:string):Observable<boolean> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users) => {

        const user = users.find((u) => u.email === email && u.password === password);
        if(user) {
          this.authenticated = true;
          this.username = user.nom + '  ' + user.prenom;
          this.usersexe = user.sexe;
          this.userrole = user.role;
          this.userDetails = {
            nom:user.nom,
            prenom:user.prenom,
            password:user.password,
            sexe:user.sexe,
            role:user.role
          };
          return true;
        } else {
          this.authenticated = false;
          this.userDetails = null;
          this.username ='';
          this.usersexe = '';
          this.userrole = '';
          return false;
        }

      }),
      catchError(
        (error) => {
          console.log('Erreur lors de la connexion : ', error);
          this.authenticated = false;
          return of(false)
      })
    );
  }

  logout() {
    this.authenticated = false;
    this.userDetails = null;
    this.username ='';
    this.usersexe = '';
    this.userrole = '';
    this.router.navigateByUrl("/login");
  }

}
