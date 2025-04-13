import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../core/event.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: any;
  isRegistered = false;

  // ✅ Notifications animées
  showNotification = false;
  notificationType: 'success' | 'error' = 'success';
  notificationMessage = '';

  private notificationTimeout: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(+id).subscribe({
        next: (res) => {
          this.event = res;
          this.checkIfUserIsRegistered(); // déplace ici après chargement
        },
        error: (err) => console.error('Erreur lors du chargement de l’événement', err)
      });
    }
  }

  checkIfUserIsRegistered() {
    this.eventService.getUserRegistrations().subscribe({
      next: (inscriptions) => {
        this.isRegistered = inscriptions.some(reg => reg.event.id === this.event.id);
      }
    });
  }

  getImage(event: any): string {
    return event?.image && event.image.trim() !== ''
      ? event.image
      : `https://source.unsplash.com/900x500/?event,${event?.id}`;
  }

  onRegister() {
    if (!this.event?.id) return;

    this.eventService.registerToEvent(this.event.id).subscribe({
      next: (res: any) => {
        this.isRegistered = true;
        this.showUserNotification('Inscription réussie !', 'success');
      },
      error: (err) => {
        if (err.status === 409) {
          this.showUserNotification('Vous êtes déjà inscrit à cet événement.', 'error');
        } else {
          this.showUserNotification('Une erreur est survenue.', 'error');
        }
      }
    });
  }

  onUnregister() {
    this.eventService.cancelRegistration(this.event.id).subscribe({
      next: (res: any) => {
        this.isRegistered = false;
        this.showUserNotification('Désinscription réussie.', 'success');
      },
      error: (err) => {
        this.showUserNotification(
          err.error?.message || 'Erreur lors de la désinscription.',
          'error'
        );
      }
    });
  }

  // ✅ Affichage notification avec timeout automatique
  showUserNotification(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;

    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }

    this.notificationTimeout = setTimeout(() => {
      this.showNotification = false;
    }, 3500); // disparaît après 3,5s
  }
}
