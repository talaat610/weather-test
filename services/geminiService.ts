import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { WeatherData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); 

const PROMPT_TEMPLATE = (city: string) => `
Fetch current weather data for the city: ${city}.
Respond strictly with a JSON object. Do not include any explanatory text, comments, or markdown formatting like \`\`\`json ... \`\`\` before or after the JSON object.
The JSON object must be parsable by JSON.parse().
The JSON object should have the following fields:
- city: string (name of the city, matching the input if possible, or the resolved city name)
- temperatureCelsius: number
- temperatureFahrenheit: number
- condition: string (e.g., 'Clear', 'Clouds', 'Rain', 'Snow', 'Mist', 'Thunderstorm')
- conditionDescription: string (a short, user-friendly description of the weather)
- humidityPercent: number (0-100)
- windSpeedKph: number
- windDirection: string (e.g., 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW')
- pressureMb: number
- visibilityKm: number
- sunriseISO: string (ISO 8601 format, UTC, e.g., '2024-07-28T06:00:00Z')
- sunsetISO: string (ISO 8601 format, UTC, e.g., '2024-07-28T20:30:00Z')
- iconIdentifier: string (one of: 'CLEAR_DAY', 'CLEAR_NIGHT', 'CLOUDY', 'PARTLY_CLOUDY_DAY', 'PARTLY_CLOUDY_NIGHT', 'RAIN', 'SHOWERS_DAY', 'SHOWERS_NIGHT', 'SNOW', 'WINDY', 'FOG', 'THUNDERSTORM')
- feelsLikeCelsius: number
- uvIndex: number (0-11+)
- cityImageUrl: string | null (A direct, publicly accessible URL to a high-quality, iconic image representing the city, preferably a famous landmark or scenic view. The image should be in JPEG, PNG or WEBP format and suitable for direct use in an <img> src attribute. If a suitable, direct image URL cannot be found, return null for this field.)

Ensure all string values are properly escaped within the JSON.
If the city is not found or data is unavailable, return a JSON object like: {"error": "City not found or data unavailable", "city": "${city}"}.
`;


export const getWeatherForCity = async (city: string): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: PROMPT_TEMPLATE(city),
      config: {
        responseMimeType: "application/json",
        temperature: 0.2, 
      },
    });

    let jsonStr = response.text.trim();
    
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData = JSON.parse(jsonStr);

    if (parsedData.error) {
      throw new Error(`${parsedData.error} (City: ${parsedData.city || city})`);
    }
    
    if (!parsedData.city || typeof parsedData.temperatureCelsius !== 'number') {
        throw new Error("Received malformed weather data from API.");
    }
    
    // Ensure cityImageUrl is either a string or null
    if (parsedData.cityImageUrl !== undefined && parsedData.cityImageUrl !== null && typeof parsedData.cityImageUrl !== 'string') {
        console.warn("Received invalid cityImageUrl, setting to null. Value:", parsedData.cityImageUrl);
        parsedData.cityImageUrl = null;
    }


    return parsedData as WeatherData;

  } catch (error) {
    console.error("Error fetching weather data from Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API request failed: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while fetching weather data.");
  }
};