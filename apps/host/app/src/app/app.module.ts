import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { loadRemoteModule } from '@nrwl/angular/mf'
import { AppComponent } from './app.component'
import { NxWelcomeComponent } from './nx-welcome.component'

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: NxWelcomeComponent,
        },
        {
          path: 'hommy',
          loadChildren: () => loadRemoteModule('hommy-app', './Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: 'auth',
          loadChildren: () => loadRemoteModule('auth-app', './Module').then((m) => m.RemoteEntryModule),
        },
      ],
      { initialNavigation: 'enabledBlocking' },
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
