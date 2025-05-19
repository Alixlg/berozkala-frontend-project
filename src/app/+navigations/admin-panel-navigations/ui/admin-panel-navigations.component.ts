import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../+components/footer/ui/footer.component';
import { FormsModule } from '@angular/forms';
import { TimeService } from '../../../+services/time.service';

@Component({
  selector: 'app-admin-component',
  imports: [RouterOutlet, RouterLink, FooterComponent, FormsModule],
  templateUrl: './admin-panel-navigations.component.html',
  styleUrl: './admin-panel-navigations.component.css'
})
export class AdminPanelNavigationsComponent {
  router = inject(Router);
  timeService = inject(TimeService);
  singOutModal = false;

  singOut() {
    this.singOutModal = false;
    this.router.navigateByUrl('/pb');
  }
}
