import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BasketService } from '../../../+services/basket.service';
import { FooterComponent } from '../../../+components/footer/ui/footer.component';

@Component({
  selector: 'app-public-navigations',
  imports: [RouterOutlet, RouterLink, FooterComponent],
  templateUrl: './public-navigations.component.html',
  styleUrl: './public-navigations.component.css'
})
export class PublicNavigationsComponent {
  basketObj = inject(BasketService);
  route = inject(Router);

  basketCount() {
    let count = 0;
    this.basketObj.basket.forEach(x => {
      count += x.count;
    });

    return count;
  }

  checkRoute(route: string) {
    return this.route.url.includes(route);
  }
}
