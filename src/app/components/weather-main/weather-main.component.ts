import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { WeatherData, WeatherService } from 'src/app/services/weather/weather.service';
import { interval, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
	selector: 'app-weather-main',
	templateUrl: './weather-main.component.html',
	styleUrls: ['./weather-main.component.scss']
})
export class WeatherMainComponent implements OnInit {

	weatherData: WeatherData = {};
	fetchInterval: Subscription;
	fetchTime = new Date();
	showTempDetails = false;
	iconUrl = '';

	constructor(private httpService: HttpService, private weatherService: WeatherService) { }

	ngOnInit() {
		this.getDataAndSetFetchInterval();
	}

	refresh() {
		this.getDataAndSetFetchInterval();
	}

	// Interval makes its first call after first time period passes, hence an extra API call.

	getDataAndSetFetchInterval() {
		this.httpService.getWeather('Wrocław').subscribe(data => {
			this.weatherData = this.weatherService.convertWeatherData(data);
			this.fetchTime = new Date();
			this.iconUrl = `https://openweathermap.org/img/wn/${this.weatherData.iconCode}@4x.png`;
			this.setFetchInterval();
		});
	}

	setFetchInterval() {
		this.clearFetchInterval();
		this.fetchInterval = interval(300000).pipe(flatMap(() => this.httpService.getWeather('Wrocław'))).subscribe(data => {
			this.weatherData = this.weatherService.convertWeatherData(data);
			this.fetchTime = new Date();
			this.iconUrl = `https://openweathermap.org/img/wn/${this.weatherData.iconCode}@4x.png`;
		});
	}

	// At refresh, interval has to be cleared and set again in order to avoid memory leaks.

	private clearFetchInterval() {
		if (this.fetchInterval) {
			this.fetchInterval.unsubscribe();
		}
	}

	parseFetchTime(fetchTime: Date): string {
		return `${fetchTime.toLocaleDateString()}, ${fetchTime.toLocaleTimeString()}`;
	}
}
