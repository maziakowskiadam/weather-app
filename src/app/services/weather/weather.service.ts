import { Injectable } from '@angular/core';
import { secondsToDate } from 'src/app/utils/date';
import { kelvinToCelsius } from 'src/app/utils/temperature';

@Injectable({
	providedIn: 'root'
})
export class WeatherService {

	constructor() { }

	convertWeatherData(data): WeatherData {
		return {
			name: data.name,
			time: new Date(secondsToDate(data.dt)),
			sunrise: new Date(secondsToDate(data.sys.sunrise)),
			sunset: new Date(secondsToDate(data.sys.sunset)),
			temp: Math.round(kelvinToCelsius(data.main.temp)),
			tempSensed: Math.round(kelvinToCelsius(data.main.feels_like)),
			tempMin: Math.round(kelvinToCelsius(data.main.temp_min)),
			tempMax: Math.round(kelvinToCelsius(data.main.temp_max)),
			humidity: data.main.humidity,
			pressure: data.main.pressure,
			clouds: data.clouds.all,
			iconCode: data.weather[0].icon,
			description: data.weather[0].description,
			main: data.weather[0].main,
			timeOfDay: this.calculateTimeOfDay(data)
		};
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

// Custom weather interface for easier API response handling

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
