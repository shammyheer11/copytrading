import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { TickerAlertsComponent } from './ticker-alerts/ticker-alerts.component';
import { SignalsAccountComponent } from './signals-account/signals-account.component';
import { MySubscriptionsComponent } from './my-subscriptions/my-subscriptions.component';
import { MyStrategiesComponent } from './my-strategies/my-strategies.component';
import { ExchangeAccountComponent } from './exchange-account/exchange-account.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { StrategiesListComponent } from './strategies-list/strategies-list.component';
import { AuthGuard } from '../core/guard/auth-guard';
import { UsersComponent } from './users/users.component';
import { MyordersComponent } from './myorders/myorders.component';
import { DetailAnalyticsComponent } from './detail-analytics/detail-analytics.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: DashboardComponent },
          { path: 'strategieslist', component: StrategiesListComponent },
          { path: 'analytics', component: AnalyticsComponent },
          { path: 'exchangeaccount', component: ExchangeAccountComponent },
          { path: 'mystrategies', component: MyStrategiesComponent },
          { path: 'mysubscriptions', component: MySubscriptionsComponent },
          { path: 'signalsaccount', component: SignalsAccountComponent },
          { path: 'tickeralerts', component: TickerAlertsComponent },
          { path: 'users', component: UsersComponent },
          { path: 'myorders', component: MyordersComponent },
          {path: 'detail/:id', component : DetailAnalyticsComponent }
        ]
      }
    ]
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
