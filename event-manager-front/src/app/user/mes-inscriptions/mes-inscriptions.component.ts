import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import {EventService} from '../../core/event.service';

@Component({
  selector: 'app-mes-inscriptions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mes-inscriptions.component.html',
  styleUrls: ['./mes-inscriptions.component.css']
})
export class MesInscriptionsComponent implements OnInit {
  inscriptions: any[] = [];
  isLoading: boolean = true;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.eventService.getUserRegistrations().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.inscriptions = res;

      },
      error: (err) => {
        console.error('Erreur chargement inscriptions', err);
          this.isLoading = false;
      }
    });
  }

  getImage(event: any): string {
    return event.image && event.image.trim() !== ''
      ? event.image
      : `https://source.unsplash.com/800x500/?event,${event.id}`;
  }
}
