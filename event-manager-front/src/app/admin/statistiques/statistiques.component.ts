import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../core/event.service';
import { RouterLink } from '@angular/router';

interface StatCard {
  id: number;
  icon: string;
  label: string;
  value?: number;
}

@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  stats: any = null;
  isLoading: boolean = true;
  statCards: StatCard[] = [
    { id: 1, icon: '📦', label: 'Événements' },
    { id: 2, icon: '👥', label: 'Utilisateurs' },
    { id: 3, icon: '📝', label: 'Inscriptions' }
  ];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.eventService.getAdminStats().subscribe({
      next: (res) => {
        this.stats = res;
        // Mettre à jour les valeurs des cartes
        this.updateStatCards();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement stats', err);
        this.isLoading = false;
      }
    });
  }

  private updateStatCards(): void {
    this.statCards = this.statCards.map(card => ({
      ...card,
      value: this.getStatValue(card.id)
    }));
  }

  getStatValue(id: number): number {
    if (!this.stats) return 0;

    switch(id) {
      case 1: return this.stats.total_events || 0;
      case 2: return this.stats.total_users || 0;
      case 3: return this.stats.total_inscriptions || 0;
      default: return 0;
    }
  }
}
