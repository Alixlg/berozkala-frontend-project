import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../+components/footer/ui/footer.component';


@Component({
  selector: 'app-private-navigations',
  imports: [RouterOutlet, RouterLink, FooterComponent],
  templateUrl: './private-navigations.component.html',
  styleUrl: './private-navigations.component.css'
})
export class PrivateNavigationsComponent {
  router = inject(Router);
  currentDate = new Date;
}
