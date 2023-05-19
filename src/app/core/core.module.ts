import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth-guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MatSnackBarModule
  ],
  providers: [AuthGuard] 
})
export class CoreModule { }
