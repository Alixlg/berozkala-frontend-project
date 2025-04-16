
import { Component } from '@angular/core';
import { CarouselBannerComponent } from "../carousel-banner/ui/carousel-banner.component";
import { ProductsBannerComponent } from "../products-banner/ui/products-banner.component";

@Component({
  selector: 'app-home',
  imports: [CarouselBannerComponent, ProductsBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
