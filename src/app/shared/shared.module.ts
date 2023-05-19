import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BlogSliderComponent } from './blog-slider/blog-slider.component';
import { StrategiesComponent } from './strategies/strategies.component';



@NgModule({
  declarations: [
    HeroSectionComponent,
    BlogSliderComponent,
    StrategiesComponent
  ],

  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    // SlickCarouselModule,
  ],

  exports : [
    HeroSectionComponent,
    BlogSliderComponent,
    StrategiesComponent
  ]
  
})
export class SharedModule { }
