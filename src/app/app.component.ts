import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event, RouterOutlet } from '@angular/router';
import { AlertSystemComponent } from './+components/alert-system/ui/alert-system.component';
import { LoadingComponent } from "./+components/loading/ui/loading.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertSystemComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'berozkala-frontend';
  router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => window.HSStaticMethods.autoInit(), 100);
      }
    });
  }
}
