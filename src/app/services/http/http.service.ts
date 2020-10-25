import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	readonly API_KEY = 'bf498100786b8c78334ab287c62b3a13';

	constructor(private http: HttpClient) { }

	getWeather(cityName: string) {
		return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.API_KEY}`);
	}
}
