import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

//External packages
import { CookieService } from 'ngx-cookie-service';

//Interceptors
import { HttpRequestInterceptor } from './interceptors/http-request-interceptor';

//Layouts
import { AuthenticationComponent } from './layouts/authentication/authentication.component';
import { AdministratorComponent } from './layouts/administrator/administrator.component';

//Shared
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { FooterComponent } from './shared/footer/footer.component';

//Components
import { ErrorComponent } from './components/error/error.component';

//Settings
import { routes } from './app-routing.module';

//Toastr
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    //Layouts
    AuthenticationComponent,
    AdministratorComponent,
    //Shared
    ToolbarComponent,
    //Components
    ErrorComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: false, relativeLinkResolution: 'legacy' })
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
