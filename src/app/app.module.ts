import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BybitService } from './core/service/bybit.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { MaterialExampleModule } from 'src/material.module';
import { AuthInterceptor } from './core/service/auth.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const TRANSLATION_ALIASES: Record<string, string> = {
  translate: 'translations',
  // Other translation aliases
};

// Create a function that will load translation files from a specific directory
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const translationOptions = {
  defaultLanguage: 'en',
  translate: 'translate'
  // Other translation options
};


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MaterialExampleModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NoopAnimationsModule,
    HttpClientModule,
    HomeModule,
    CoreModule,
    AuthModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
  ],
  providers: [
    BybitService,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
