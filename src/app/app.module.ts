import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WeatherMainComponent } from './components/weather-main/weather-main.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatTooltipModule } from '@angular/material';

@NgModule({
	declarations: [
		AppComponent,
		WeatherMainComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatIconModule,
		MatTooltipModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
