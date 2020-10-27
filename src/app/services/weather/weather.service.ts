import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { WeatherData } from 'src/app/model/weather-data';
import { secondsToDate } from 'src/app/utils/date';
import { kelvinToCelsius } from 'src/app/utils/temperature';
import { HttpService } from '../http/http.service';

@Injectable({
	providedIn: 'root'
})
export class WeatherService {

	refresh$ = new BehaviorSubject(null);

	constructor(private httpService: HttpService) { }

	loadWeather$: Observable<WeatherData> = this.httpService.getWeather('Wrocław').pipe(
		map(data => this.convertWeatherData(data))
	);

	weather$ = this.refresh$.pipe(
		exhaustMap(() => this.loadWeather$)
	);

	convertWeatherData(data): WeatherData {
		return {
			name: data.name,
			time: new Date(secondsToDate(data.dt)),
			fetchTime: new Date(),
			sunrise: new Date(secondsToDate(data.sys.sunrise)),
			sunset: new Date(secondsToDate(data.sys.sunset)),
			temp: Math.round(kelvinToCelsius(data.main.temp)),
			tempSensed: Math.round(kelvinToCelsius(data.main.feels_like)),
			tempMin: Math.round(kelvinToCelsius(data.main.temp_min)),
			tempMax: Math.round(kelvinToCelsius(data.main.temp_max)),
			humidity: data.main.humidity,
			pressure: data.main.pressure,
			clouds: data.clouds.all,
			iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
			description: data.weather[0].description,
			main: data.weather[0].main,
			timeOfDay: this.calculateTimeOfDay(data)
		};
	}

	private calculateTimeOfDay(data): string {
		const sunrise = new Date(secondsToDate(data.sys.sunrise));
		const sunset = new Date(secondsToDate(data.sys.sunset));
		const dt = new Date(secondsToDate(data.dt));

		if (dt > sunrise && dt.getHours() < 12) {
			return 'morning';
		} else if (dt.getHours() >= 12 && dt < sunset) {
			return 'day';
		} else if (dt > sunset || dt < sunrise) {
			return 'night';
		}

	}
}
