import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // service global
})
export class AuthService {

  // 👉 Adresse de ton API Laravel
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Inscription d'un utilisateur
   */
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  /**
   * Connexion d'un utilisateur
   */
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  /**
   * Sauvegarder les infos de session (token + user)
   */
  setSession(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Supprimer la session
   */
  clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Récupérer le token d'authentification
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Récupérer les infos utilisateur (email, rôle...)
   */
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Redirige l'utilisateur selon son rôle
   */
  redirectToDashboard() {
    const user = this.getUser();
    if (user?.role === 'admin') {
      this.router.navigate(['/dashboard/admin']);
    } else if (user?.role === 'utilisateur') {
      this.router.navigate(['/dashboard/user']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
