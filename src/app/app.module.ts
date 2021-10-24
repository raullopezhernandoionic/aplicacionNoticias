import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'

//Plugin para poder visualizar imagenes en android
//Es necesario declararlo en Providers
// En Ionic 4 y versiones superiores este plugin se encuentra en la carpeta ngx
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

// Pulgin para poder compartir por redes sociales , email etc contenido
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot()],
  providers: [InAppBrowser, SocialSharing, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
