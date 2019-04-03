import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@app/core/core.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
