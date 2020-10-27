export interface WeatherData {
	name?: string;
	time?: Date;
	fetchTime?: Date;
	sunrise?: Date;
	sunset?: Date;
	temp?: number;
	tempSensed?: number;
	tempMin?: number;
	tempMax?: number;
	humidity?: number;
	pressure?: number;
	clouds?: number;
	iconUrl?: string;
	description?: string;
	main?: string;
	timeOfDay?: string;
}
