// src/app/components/ticket/ticket-list/ticket-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../../models/ticket.model';
import { TicketService } from '../../../services/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-list',
  standalone: false,
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets().subscribe(data => {
      this.tickets = data;
    });
  }

  updateTicket(ticket: Ticket): void {
    Swal.fire({
      title: 'Mettre à jour le ticket',
      html: `
        <input id="title" class="swal2-input" placeholder="Titre" value="${ticket.title}">
        <input id="description" class="swal2-input" placeholder="Description" value="${ticket.description}">
        <input id="status" class="swal2-input" placeholder="Statut" value="${ticket.status}">
      `,
      confirmButtonText: 'Mettre à jour',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        return {
          ...ticket,
          title: (document.getElementById('title') as HTMLInputElement).value,
          description: (document.getElementById('description') as HTMLInputElement).value,
          status: (document.getElementById('status') as HTMLInputElement).value,
          updatedAt: new Date().toISOString()
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketService.updateTicket(result.value).subscribe(() => {
          Swal.fire('Succès', 'Ticket mis à jour', 'success');
          this.loadTickets();
        });
      }
    });
  }

  deleteTicket(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketService.deleteTicket(id).subscribe(() => {
          Swal.fire('Supprimé !', 'Le ticket a été supprimé.', 'success');
          this.loadTickets();
        });
      }
    });
  }
}
