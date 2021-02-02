import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

//Layouts
import { AuthenticationComponent } from './layouts/authentication/authentication.component';
import { AdministratorComponent } from './layouts/administrator/administrator.component';

//Shared
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

//Components
import { ErrorComponent } from './components/error/error.component';

//Settings
import { routes } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    //Layouts
    AuthenticationComponent,
    AdministratorComponent,
    //Shared
    ToolbarComponent,
    SidebarComponent,
    //Components
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: false, relativeLinkResolution: 'legacy' })
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
