import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carousel-banner',
  imports: [RouterLink],
  templateUrl: './carousel-banner.component.html',
  styleUrl: './carousel-banner.component.css'
})
export class CarouselBannerComponent {
  CarouselBanners = [
    { title: 'هدفن', description: 'با تخفیف ویژه', productLink: '', productBanner: '/images/banner1.jpg' },
    { title: 'موس', description: 'با تخفیف ویژه', productLink: '', productBanner: '/images/banner2.webp' },
    { title: 'کیبورد', description: 'با تخفیف ویژه', productLink: '', productBanner: '/images/banner3.jpg' },
  ];
}
