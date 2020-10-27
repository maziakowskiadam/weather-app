import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { Subscription, timer } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { WeatherData } from 'src/app/model/weather-data';

@Component({
	selector: 'app-weather-main',
	templateUrl: './weather-main.component.html',
	styleUrls: ['./weather-main.component.scss']
})
export class WeatherMainComponent implements OnInit, OnDestroy {

	TIME_INTERVAL = 300000;
	showTempDetails = false;
	refreshTimer$ = timer(0, this.TIME_INTERVAL);
	weather: WeatherData = {};
	subscriptions: Subscription[] = [];

	constructor(private weatherService: WeatherService) { }

	ngOnInit() {
		this.subscriptions.push(this.refreshTimer$.subscribe(this.weatherService.refresh$));
		this.subscriptions.push(
			this.weatherService.weather$.subscribe(data => this.weather = data));
	}

	refresh(): void {
		this.weatherService.refresh$.next(null);
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => {
			sub.unsubscribe();
		});
	}
}
