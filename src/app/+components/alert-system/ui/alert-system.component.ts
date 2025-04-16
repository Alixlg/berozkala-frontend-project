import { Component, inject } from '@angular/core';
import { AlertService } from '../../../+services/alert.service';

@Component({
  selector: 'app-alert-system',
  imports: [],
  templateUrl: './alert-system.component.html',
  styleUrl: './alert-system.component.css'
})
export class AlertSystemComponent {
  alertSystemObj = inject(AlertService);
}
