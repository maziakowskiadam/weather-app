import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { WeatherData, WeatherService } from 'src/app/services/weather/weather.service';
import { interval, Subscription } from 'rxjs';
import { timeInterval, flatMap } from 'rxjs/operators';

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

	getDataAndSetFetchInterval() {
		this.httpService.getWeather('Wrocław').subscribe(data => {
			this.weatherData = this.weatherService.convertWeatherData(data);
			this.fetchTime = new Date();
			this.iconUrl = `http://openweathermap.org/img/wn/${this.weatherData.iconCode}@4x.png`;
			this.setFetchInterval();
			console.log(this.weatherData);
		});
	}

	setFetchInterval() {
		this.clearFetchInterval();
		this.fetchInterval = interval(300000).pipe(flatMap(() => this.httpService.getWeather('Wrocław'))).subscribe(data => {
			this.weatherData = this.weatherService.convertWeatherData(data);
			this.fetchTime = new Date();
			this.iconUrl = `http://openweathermap.org/img/wn/${this.weatherData.iconCode}@4x.png`;
			console.log(this.weatherData);
		});
	}

	private clearFetchInterval() {
		if (this.fetchInterval) {
			this.fetchInterval.unsubscribe();
		}
	}

	parseFetchTime(fetchTime: Date): string {
		return `${fetchTime.toLocaleDateString()}, ${fetchTime.toLocaleTimeString()}`;
	}
}
