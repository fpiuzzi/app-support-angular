import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import {DataTable} from 'simple-datatables';
import {AuthenticationService} from '../../../services/authservice.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, protected authService: AuthenticationService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      setTimeout(() => {
        new DataTable("#usersTable", {
          searchable: true,
          perPage: 10,
          perPageSelect: [5, 10, 20, 40],
          labels: {
            placeholder: "Rechercher...",
            perPage: " utilisateurs par page",
            noRows: "Aucun utilisateur trouvé",
            noResults: 'Désolé, aucun résultat ne correspond à votre recherche.',
            info: "Affichage de {start} à {end} sur {rows} utilisateurs"
          }
        });
      }, 100);
    });
  }

  updateUser(user: User): void {
    Swal.fire({
      title: 'Mettre à jour l\'utilisateur',
      html: `
        <input id="nom" class="swal2-input" placeholder="Nom" value="${user.nom}">
        <input id="prenom" class="swal2-input" placeholder="Prénom" value="${user.prenom}">
        <input id="adresse" class="swal2-input" placeholder="Adresse" value="${user.adresse}">
        <input id="email" class="swal2-input" placeholder="Email" value="${user.email}">
        <input id="password" class="swal2-input" placeholder="Mot de passe" value="${user.password}">
        <input id="sexe" class="swal2-input" placeholder="Sexe" value="${user.sexe}">
        <input id="telephone" class="swal2-input" placeholder="Téléphone" value="${user.telephone}">
        <input id="role" class="swal2-input" placeholder="Rôle" value="${user.role}">
      `,
      confirmButtonText: 'Mettre à jour',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        return {
          ...user,
          nom: (document.getElementById('nom') as HTMLInputElement).value,
          prenom: (document.getElementById('prenom') as HTMLInputElement).value,
          adresse: (document.getElementById('adresse') as HTMLInputElement).value,
          email: (document.getElementById('email') as HTMLInputElement).value,
          password: (document.getElementById('password') as HTMLInputElement).value,
          sexe: (document.getElementById('sexe') as HTMLInputElement).value,
          telephone: (document.getElementById('telephone') as HTMLInputElement).value,
          role: (document.getElementById('role') as HTMLInputElement).value
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.updateUser(result.value).subscribe(() => {
          Swal.fire('Succès', 'Utilisateur mis à jour', 'success');
          this.userService.getUsers().subscribe(data => {
            this.users = data;
          });
        });
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }
}
