export interface WeatherData {
  city: string;
  temperatureCelsius: number;
  temperatureFahrenheit: number;
  condition: string; // e.g., 'Clear', 'Clouds', 'Rain', 'Snow'
  conditionDescription: string;
  humidityPercent: number;
  windSpeedKph: number;
  windDirection: string; // e.g., 'N', 'SW'
  pressureMb: number;
  visibilityKm: number;
  sunriseISO: string; // ISO 8601 format
  sunsetISO: string;  // ISO 8601 format
  iconIdentifier: string; // 'CLEAR_DAY', 'CLOUDY', 'RAIN', etc.
  feelsLikeCelsius: number;
  uvIndex: number; // 0-11+
  cityImageUrl?: string | null; // URL for a representative image of the city
}