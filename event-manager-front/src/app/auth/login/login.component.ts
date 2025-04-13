import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../core/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.errorMessage = '';

    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data).subscribe({
      next: (res: any) => {
        // 🔐 Enregistre le token + utilisateur dans localStorage
        this.authService.setSession(res.token, res.user);

        // Redirige selon le rôle (admin ou utilisateur)
        this.authService.redirectToDashboard();
      },
      error: err => {
        // Gestion des erreurs du backend
        this.errorMessage = err.error?.message || 'Échec de la connexion.';
      }
    });
  }
}
