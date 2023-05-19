import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminComponent } from './admin/admin.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { StrategiesListComponent } from './strategies-list/strategies-list.component';
import { MySubscriptionsComponent } from './my-subscriptions/my-subscriptions.component';
import { MyStrategiesComponent } from './my-strategies/my-strategies.component';
import { TickerAlertsComponent } from './ticker-alerts/ticker-alerts.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ExchangeAccountComponent } from './exchange-account/exchange-account.component';
import { SignalsAccountComponent } from './signals-account/signals-account.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from '../core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { UsersComponent } from './users/users.component';
import { MyordersComponent } from './myorders/myorders.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminComponent,
    StrategiesListComponent,
    MySubscriptionsComponent,
    MyStrategiesComponent,
    TickerAlertsComponent,
    AnalyticsComponent,
    ExchangeAccountComponent,
    SignalsAccountComponent,
    UsersComponent,
    MyordersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSelectModule,
    CoreModule,
    NgxSpinnerModule,
    MatSliderModule,
    FormsModule,
    MatTabsModule
  ]
})
export class AdminModule { }
