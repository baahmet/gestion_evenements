import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="content">
      <router-outlet></router-outlet>


    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    .content {
      padding: 6rem 1rem 5rem; /* top padding ↑ à cause de la navbar */
    }
  `]
})
export class AppComponent {}


