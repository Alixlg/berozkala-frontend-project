import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../+components/footer/ui/footer.component';
import { BasketService } from '../../../+pages/+public/basket/service/basket.service';

@Component({
  selector: 'app-public-navigations',
  imports: [RouterOutlet, RouterLink, FooterComponent],
  templateUrl: './public-navigations.component.html',
  styleUrl: './public-navigations.component.css'
})
export class PublicNavigationsComponent {
  basketService = inject(BasketService);
  route = inject(Router);

  basketCount() {
    let count = 0;
    this.basketService.getBasketItems().forEach(x => {
      count += x.count;
    });

    return count;
  }
}
