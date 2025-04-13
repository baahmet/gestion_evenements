import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {EventService} from '../../core/event.service';


@Component({
  standalone: true,
  selector: 'app-dashboard-admin',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  stats: any = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getAdminStats().subscribe({
      next: (res) => this.stats = res,
      error: () => alert('Erreur lors du chargement des statistiques.')
    });
  }

  darkMode: boolean = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

}
