import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authservice.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  public userRole : string = '';

  constructor(public authService : AuthenticationService) {
  }

  ngOnInit(): void {

  }

  getUserImage(sexe: string): string {
    return sexe === 'Homme'
      ? 'assets/img/profile-img.jpg'
      : 'assets/img/profil-img-women.jpg';
  }

  logout() {
    this.authService.logout();
  }

}
