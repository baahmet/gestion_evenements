import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import {EventService} from '../../core/event.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-gestion-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gestion-utilisateurs.component.html',
  styleUrls: ['./gestion-utilisateurs.component.css']
})
export class GestionUtilisateursComponent implements OnInit {
  users: any[] = [];
  searchTerm: string = '';
  filteredUsers: any[] = [];
  isLoading: boolean = true;


  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.eventService.getAllUsers().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.users = res;
        this.filteredUsers = res; // initialise
      },
      error: () => {
        alert('Erreur chargement utilisateurs');
        this.isLoading = false;
      }
    });
  }

  changeRole(user: any, newRole: string) {
    this.eventService.updateUserRole(user.id, newRole).subscribe(() => {
      user.role = newRole;
    });
  }

  deleteUser(user: any) {
    if (confirm(`Supprimer l'utilisateur ${user.email} ?`)) {
      this.eventService.deleteUser(user.id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== user.id);
      });
    }
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase().trim();

    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }

}
