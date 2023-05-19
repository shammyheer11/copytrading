import { Component } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-blog-slider',
  templateUrl: './blog-slider.component.html',
  styleUrls: ['./blog-slider.component.scss'],

})
export class BlogSliderComponent {

  activeIndex = 0;
  newsItems = [
    'Bybit: Your Trusted Partner for Secure, Smooth and Rewarding Crypto Trading',
    'P2P Referral Rush: Refer Friends and Share a 50,000 USDT Bonus Pool!',
    '[Africa Exclusive] Trade and Earn Up to $2,000 in Rewards'
  ];

  slides = [
    {img: "/assets/images/blogs.png", slideTitle : "Paradigm x Bybit", slideDesc : 'Celebrate the Opening With 7,000 USDT in Rewards and 0 fees* on Spot!'},
    {img: "/assets/images/blogs3.png", slideTitle : "Paradigm x Bybit", slideDesc : 'Celebrate the Opening With 7,000 USDT in Rewards and 0 fees* on Spot!'},
    {img: "/assets/images/blogs2.png", slideTitle : "Paradigm x Bybit", slideDesc : 'Celebrate the Opening With 7,000 USDT in Rewards and 0 fees* on Spot!'},
    {img: "/assets/images/blogs.png", slideTitle : "Paradigm x Bybit", slideDesc : 'Celebrate the Opening With 7,000 USDT in Rewards and 0 fees* on Spot!'},
    {img: "/assets/images/blogs3.png", slideTitle : "Paradigm x Bybit", slideDesc : 'Celebrate the Opening With 7,000 USDT in Rewards and 0 fees* on Spot!'},
    {img: "/assets/images/blogs2.png", slideTitle : "Paradigm x Bybit", slideDesc : 'Celebrate the Opening With 7,000 USDT in Rewards and 0 fees* on Spot!'}
  ];

  slideConfig = {
    arrows: true,
    "slidesToShow": 3, 
    "slidesToScroll": 2, 
    "infinite": true, 
    "dots": true,
    // "autoplay": true,
    // "autoplaySpeed": 2000
};
  

  
  slickInit(e : any) {
    console.log('slick initialized');
  }
  
  breakpoint(e : any ) {
    console.log('breakpoint');
  }
  
  afterChange(e : any) {
    console.log('afterChange');
  }
  
  beforeChange(e : any) {
    console.log('beforeChange');
  }


  ngOnInit() {
    setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.newsItems.length;
    }, 3000); // adjust the interval as needed
  }


}
