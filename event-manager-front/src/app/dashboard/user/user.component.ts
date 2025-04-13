import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { EventService } from '../../core/event.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class DashboardUserComponent implements OnInit {
  user: any = null;
  inscriptions: any[] = [];
  loading: boolean = true;
  error: string | null = null;



  constructor(
    private authService: AuthService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadUserRegistrations();
  }

  private loadUserData(): void {
    try {
      this.user = this.authService.getUser();
      if (!this.user) {
        this.error = "Impossible de récupérer les données utilisateur";
      }
    } catch (err) {
      this.error = "Une erreur est survenue lors du chargement de votre profil";
      console.error('Erreur lors du chargement des données utilisateur:', err);
    }
  }

  private loadUserRegistrations(): void {
    this.loading = true;

    this.eventService.getUserRegistrations()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (res) => {
          this.inscriptions = res.slice(0, 3);
        },
        error: (err) => {
          this.error = "Impossible de charger vos inscriptions";
          console.error('Erreur lors du chargement des inscriptions:', err);
        }
      });
  }




}
