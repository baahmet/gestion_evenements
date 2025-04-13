import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../core/event.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion-evenements',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gestion-evenements.component.html',
  styleUrls: ['./gestion-evenements.component.css']
})
export class GestionEvenementsComponent implements OnInit {
  events: any[] = [];
  imagePreview: string = '';
  searchTerm = '';
  selectedCategorie = '';
  selectedLieu = '';
  filteredEvents: any[] = [];
  isLoading: boolean = true;
  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';

  categories: string[] = [];
  lieux: string[] = [];

  newEvent: any = {
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
    lieu: '',
    capacite: 1,
    categorie: '',
    image: ''
  };

  isEditing: boolean = false;
  editingId: number | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  private showAlert(message: string, type: 'success' | 'error' = 'success'): void {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
  loadEvents() {
    this.isLoading = true;
    this.eventService.getAllEvents().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.events = res;
        this.filteredEvents = res;
        this.categories = [...new Set(res.map((e: any) => e.categorie).filter(Boolean))];
        this.showAlert('Événements chargés avec succès');
      },
      error: () => {
        this.isLoading = false;
        this.showAlert('Erreur lors du chargement des événements', 'error');
      }
    });
  }


  filtrerEvenements() {
    this.filteredEvents = this.events.filter(e =>
      this.selectedCategorie ? e.categorie === this.selectedCategorie : true
    );
  }

  resetFiltre() {
    this.selectedCategorie = '';
    this.filteredEvents = [...this.events];
  }

  saveEvent() {
    if (this.isEditing && this.editingId !== null) {
      this.eventService.updateEvent(this.editingId, this.newEvent).subscribe({
        next: () => {
          this.showAlert('Événement modifié avec succès');
          this.resetForm();
          this.loadEvents();
        },
        error: () => {
          this.showAlert('Erreur lors de la modification', 'error');
        }
      });
    } else {
      this.eventService.createEvent(this.newEvent).subscribe({
        next: () => {
          this.showAlert('Événement créé avec succès');
          this.resetForm();
          this.loadEvents();
        },
        error: () => {
          this.showAlert('Erreur lors de la création', 'error');
        }
      });
    }
  }

  editEvent(event: any) {
    this.newEvent = { ...event };
    this.editingId = event.id;
    this.isEditing = true;
  }

  deleteEvent(id: number) {
    if (confirm('Supprimer cet événement ?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.showAlert('Événement supprimé avec succès');
          this.loadEvents();
        },
        error: () => {
          this.showAlert('Erreur lors de la suppression', 'error');
        }
      });
    }
  }
  resetForm() {
    this.newEvent = {
      titre: '',
      description: '',
      date_debut: '',
      date_fin: '',
      lieu: '',
      capacite: 1,
      categorie: '',
      image: ''
    };
    this.editingId = null;
    this.isEditing = false;
    this.imagePreview = '';

  }

  updatePreview() {
    this.imagePreview = this.newEvent.image;
  }


  downloadPdf(eventId: number) {
    this.eventService.exportPdf(eventId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `liste-inscrits-event-${eventId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.showAlert('PDF exporté avec succès');
      },
      error: () => {
        this.showAlert("Erreur lors de l'export PDF", 'error');
      }
    });
  }


  getImage(event: any): string {
    return event.image?.trim() !== ''
      ? event.image
      : `https://source.unsplash.com/800x400/?event,technology,${event.id}`;
  }


  getStaggerDelay(index: number): string {
    return `${index * 100}ms`;
  }


  currentPage: number = 1;
  itemsPerPage: number = 6;

  get paginatedEvents(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEvents.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  goToPage(page: number) {
    this.currentPage = page;
  }



}
