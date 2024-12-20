// src/app/components/ticket/add-ticket/add-ticket.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {TicketService} from '../../../services/ticket.service';

@Component({
  selector: 'app-add-ticket',
  standalone:false,
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {
  ticketForm: FormGroup;
  nextTicketNumber: number | undefined;
  highestTicketId: number | undefined;

  constructor(private fb: FormBuilder, private ticketService: TicketService, private router: Router) {
    this.ticketForm = this.fb.group({
      ticketNumber: [0, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      createdAt: [new Date().toISOString(), Validators.required],
      updatedAt: [new Date().toISOString(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.ticketService.getNextTicketNumber().subscribe(number => {
      this.nextTicketNumber = number;
      const ticketNumberControl = this.ticketForm.get('ticketNumber');
      if (ticketNumberControl) {
        ticketNumberControl.setValue(this.nextTicketNumber);
      }
    });
    this.ticketService.getHighestTicketId().subscribe(id => {
      this.highestTicketId = id;
    });
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const newTicket = this.ticketForm.value;
      this.ticketService.addTicket(newTicket).subscribe(() => {
        this.ticketService.loadTickets();
        this.router.navigateByUrl('/menu/tickets');
      });
    }
  }
}
