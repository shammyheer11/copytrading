import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../core/core.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { InvestorComponent } from './investor/investor.component';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FrontComponent } from './front/front.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ 
    InvestorComponent, IndexComponent, AboutComponent, ContactComponent, FrontComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    AppRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class HomeModule { }
