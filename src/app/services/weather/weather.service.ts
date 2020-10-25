import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class WeatherService {

	constructor() { }

	convertWeatherData(data): WeatherData {
		let weatherData: WeatherData;

		weatherData = {
			name: data.name,
			time: new Date(data.dt * 1000),
			sunrise: new Date(data.sys.sunrise * 1000),
			sunset: new Date(data.sys.sunset * 1000),
			temp: Math.round(data.main.temp - 272.15),
			tempSensed: Math.round(data.main.feels_like - 272.15),
			tempMin: Math.round(data.main.temp_min - 272.15),
			tempMax: Math.round(data.main.temp_max - 272.15),
			humidity: data.main.humidity,
			pressure: data.main.pressure,
			clouds: data.clouds.all,
			iconCode: data.weather[0].icon,
			description: data.weather[0].description,
			main: data.weather[0].main,
			timeOfDay: this.calculateTimeOfDay(data)
		};

		return weatherData;
	}

	private calculateTimeOfDay(data): string {
		const sunrise = new Date(data.sys.sunrise * 1000);
		const sunset = new Date(data.sys.sunset * 1000);
		const dt = new Date(data.dt * 1000);

		if (dt > sunrise && dt.getHours() < 12) {
			return 'morning';
		} else if (dt.getHours() >= 12 && dt < sunset) {
			return 'day';
		} else if (dt > sunset || dt < sunrise) {
			return 'night';
		}

	}

}

export interface WeatherData {
	name?: string;
	time?: Date;
	sunrise?: Date;
	sunset?: Date;
	temp?: number;
	tempSensed?: number;
	tempMin?: number;
	tempMax?: number;
	humidity?: number;
	pressure?: number;
	clouds?: number;
	iconCode?: string;
	description?: string;
	main?: string;
	timeOfDay?: string;
}
