import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'http://localhost:8000/api'; // Laravel API

  constructor(private http: HttpClient) {}

  /**
   * Récupérer tous les événements
   */
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/events`);
  }

  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events/${id}`);
  }

  registerToEvent(eventId: number) {
    return this.http.post(`${this.baseUrl}/events/${eventId}/register`, {});
  }

  cancelRegistration(eventId: number) {
    return this.http.delete(`${this.baseUrl}/events/${eventId}/cancel`);
  }

  getUserRegistrations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/mes-inscriptions`);
  }





  // Liste complète des événements (admin)
  getAllEvents() {
    return this.http.get<any[]>(`${this.baseUrl}/events`);
  }

// Créer un événement
  createEvent(data: any) {
    return this.http.post(`${this.baseUrl}/events`, data);
  }

// Modifier un événement
  updateEvent(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/events/${id}`, data);
  }

// Supprimer un événement
  deleteEvent(id: number) {
    return this.http.delete(`${this.baseUrl}/events/${id}`);
  }

  exportPdf(eventId: number) {
    return this.http.get(`${this.baseUrl}/events/${eventId}/registrations/pdf`, {
      responseType: 'blob' // très important pour gérer le fichier PDF
    });
  }

  getAdminStats() {
    return this.http.get<any>(`${this.baseUrl}/admin/stats`);
  }

  getAllUsers() {
    return this.http.get<any[]>(`${this.baseUrl}/admin/users`);
  }

  updateUserRole(id: number, role: string) {
    return this.http.put(`${this.baseUrl}/admin/users/${id}/role`, { role });
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/admin/users/${id}`);
  }








}
