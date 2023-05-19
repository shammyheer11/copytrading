import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestorComponent } from './investor/investor.component';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FrontComponent } from './front/front.component';

const routes: Routes = [


  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'inverstor', component: InvestorComponent },
          { path: 'about', component: AboutComponent },
          { path: 'contact', component: ContactComponent },
          { path: '', component: FrontComponent }
        ]
      }
    ]
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
