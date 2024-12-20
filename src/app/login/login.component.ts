import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginFormGroup! : FormGroup;
  public loginError:string = '';
  constructor(private fb : FormBuilder,
              private authService : AuthenticationService,
              private router : Router) {
  }
  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      username :  [''],
      password : ['']
    });
  }

  login() {
    if(this.loginFormGroup.valid) {
      let username = this.loginFormGroup.value.username;
      let password = this.loginFormGroup.value.password;
      this.authService.login(username,password).subscribe((isAuthenticated) => {
        if(isAuthenticated) {
          console.log('Utilisateur authentifie : ',this.authService.userDetails);
          this.loginError = '';
          this.router.navigateByUrl("/menu");

        } else {
          this.loginError = 'Identifiant ou mot de passe incorrect.';
        }
      })
    } else {
      this.loginError = 'Veuillez remplir correctement le formulaire'
    }
  }
}
