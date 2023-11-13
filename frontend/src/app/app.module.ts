import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/shared/modules/app-routing.module';
import { AppComponent } from '@app/app.component';
import { SearchBarComponent } from '@app/header/feature/search-bar/search-bar.component';
import { NavBarComponent } from '@app/header/feature/nav-bar/nav-bar.component';
import { NoticeDetailComponent } from '@app/notices/feature/notice-detail/notice-detail.component';
import { NoticeListComponent } from '@app/notices/feature/notice-list/notice-list.component';
import { ErrorComponent } from '@app/shared/error/error.component';
import { MainContainerComponent } from '@app/shared/main-container/main-container.component';
import { NoticeFormComponent } from '@app/notices/feature/notice-form/notice-form.component';
import { LoaderComponent } from '@app/shared/loader/loader.component';
import { NotFoundComponent } from '@app/shared/not-found/not-found.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoticeCardComponent } from '@app/notices/feature/notice-list/notice-card/notice-card.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'environments/environment.production';
import { AuthLoginButtonComponent } from './shared/auth/auth-login-button/auth-login-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AuthLogoutButtonComponent } from './shared/auth/auth-logout-button/auth-logout-button.component';
import { PopupCardComponent } from './shared/popup-card/popup-card.component';
import { UserProfileComponent } from './users/feature/user-profile/user-profile.component';
import { UsersApiService } from './users/data-access/services/users-api.service';
import { AsyncPipe } from '@angular/common';
import {
    faBars as fasBars,
    faArrowRightToBracket as fasArrowRightToBracket,
    faCashRegister as fasCashRegister,
    faCity as fasCity,
    faTruckRampBox as fasTruckRampBox 
  } from '@fortawesome/free-solid-svg-icons';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { NoticesEffects } from './notices/data-access/store/notices.effects';
import { noticesReducer } from './notices/data-access/store/notices.reducer';
import { NoticesApiService } from './notices/data-access/services/notices-api.service';
import { MaterialModule } from './shared/modules/material.module';
import { AppEffects } from './shared/store/app.effects';
import { UsersEffect } from './users/data-access/store/users.effects';
import { usersReducer } from './users/data-access/store/users.reducer';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { RequestRetryInterceptor } from './shared/interceptors/request-retry.interceptor';
import { ProductCarouselComponent } from './notices/feature/notice-detail/product-carousel/product-carousel/product-carousel.component';
import { UserCardComponent } from './notices/feature/notice-detail/user-card/user-card.component';


@NgModule({
  declarations: [
    AppComponent,
    NoticeListComponent,
    ErrorComponent,
    SearchBarComponent,
    NavBarComponent,
    LoaderComponent,
    MainContainerComponent,
    NoticeFormComponent,
    NoticeDetailComponent,
    NotFoundComponent,
    NoticeCardComponent,
    AuthLoginButtonComponent,
    AuthLogoutButtonComponent,
    PopupCardComponent,
    UserProfileComponent,
    ProductCarouselComponent,
    UserCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AsyncPipe,
    AuthModule.forRoot({
      domain: environment.auth0Domain!,
      clientId: environment.auth0ClientId!,
      authorizationParams: {
        audience: environment.auth0Audience,
        redirect_uri: window.location.origin
      }
    }),
    BrowserAnimationsModule,
    StoreModule.forRoot({
      noticesState: noticesReducer,
      userState: usersReducer
    }),
    EffectsModule.forRoot([NoticesEffects, AppEffects, UsersEffect]),
  ],
  providers: [
    NoticesApiService, 
    UsersApiService, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: RequestRetryInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIcons(fasCashRegister,
      fasCity,
      fasTruckRampBox,
      fasArrowRightToBracket,
      fasBars,
    );
  }
 }
