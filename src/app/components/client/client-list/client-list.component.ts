// src/app/components/client/client-list/client-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client.model';
import { ClientService } from '../../../services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-list',
  standalone: false,
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }
  updateClient(client: Client): void {
    Swal.fire({
      title: 'Mettre à jour le client',
      html: `
        <input id="nom" class="swal2-input" placeholder="Nom" value="${client.nom}">
        <input id="prenom" class="swal2-input" placeholder="Prénom" value="${client.prenom}">
        <input id="telephone" class="swal2-input" placeholder="Téléphone" value="${client.telephone}">
        <input id="email" class="swal2-input" placeholder="Email" value="${client.email}">
      `,
      confirmButtonText: 'Mettre à jour',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        return {
          ...client,
          nom: (document.getElementById('nom') as HTMLInputElement).value,
          prenom: (document.getElementById('prenom') as HTMLInputElement).value,
          telephone: (document.getElementById('telephone') as HTMLInputElement).value,
          email: (document.getElementById('email') as HTMLInputElement).value
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.updateClient(result.value).subscribe(() => {
          Swal.fire('Succès', 'Client mis à jour', 'success');
          this.clientService.getClients().subscribe(data => {
            this.clients = data;
          });
        });
      }
    });
  }

  deleteClient(id: number): void {
    this.clientService.deleteClient(id).subscribe(() => {
      this.clients = this.clients.filter(client => client.id !== id);
    });
  }
}
