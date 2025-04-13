import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../core/event.service';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  isLoading: boolean = true;

  filteredEvents: any[] = [];
  filters = {
    titre: '',
    lieu: '',
    categorie: '',
    date: ''
  };
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.eventService.getEvents().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.events = res;
        this.filteredEvents = res;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des événements', err)
        this.isLoading = false;
      }

    });
  }

  applyFilters() {
    this.filteredEvents = this.events.filter(event => {
      const titreMatch = event.titre.toLowerCase().includes(this.filters.titre.toLowerCase());
      const lieuMatch = event.lieu.toLowerCase().includes(this.filters.lieu.toLowerCase());
      const categorieMatch = event.categorie?.toLowerCase().includes(this.filters.categorie.toLowerCase()) ?? true;
      const dateMatch = this.filters.date
        ? event.date_debut.startsWith(this.filters.date)
        : true;

      return titreMatch && lieuMatch && categorieMatch && dateMatch;
    });
  }
  resetFilters() {
    this.filters = {
      titre: '',
      lieu: '',
      categorie: '',
      date: ''
    };
    this.filteredEvents = this.events;
  }


  //  Méthode propre pour retourner une image (ou image par défaut)
  getImage(event: any): string {
    return event.image && event.image.trim() !== ''
      ? event.image
      : `https://source.unsplash.com/800x500/?event,technology,${event.id}`;
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
