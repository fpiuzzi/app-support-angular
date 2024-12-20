// src/app/services/ticket.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Ticket} from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:3000/tickets';

  constructor(private http: HttpClient) {
    this.loadTickets();
  }

  loadTickets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tickets`);
  }
  getNextTicketNumber(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/tickets`).pipe(
      map(tickets => {
        if (tickets.length === 0) {
          return 1;
        }
        const maxTicketNumber = Math.max(...tickets.map(ticket => ticket.ticketNumber));
        return maxTicketNumber + 1;
      })
    );
  }
  getHighestTicketId(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/tickets`).pipe(
      map(tickets => {
        if (tickets.length === 0) {
          return 0;
        }
        return Math.max(...tickets.map(ticket => ticket.id));
      })
    );
  }
  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${ticket.id}`, ticket);
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
