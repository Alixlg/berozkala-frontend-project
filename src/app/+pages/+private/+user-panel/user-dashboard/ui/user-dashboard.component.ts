import { Component } from '@angular/core';
import { AccountProfileComponent } from "../../../../../+components/account-profile/ui/account-profile.component";

@Component({
  selector: 'app-user-dashboard',
  imports: [AccountProfileComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
