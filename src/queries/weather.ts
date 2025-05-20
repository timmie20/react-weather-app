import axios, { AxiosError } from "axios";
import { ApiError, ApiResponse, ForecastResponse } from "../types/queries";

interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

// const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getCurrentWeather = async (
  lat: number,
  lon: number
): Promise<ApiResponse<WeatherResponse> | ApiError> => {
  try {
    // if (!apiKey) {
    //   throw new Error("Weather API key is not configured");
    // }

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=aeda7b0daaf670a1ded80f8faa2de10c`
    );
    return { success: true, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.statusText,
      };
    }

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

const getForecast = async (
  lat: number,
  lon: number
): Promise<ApiResponse<ForecastResponse> | ApiError> => {
  try {
    // if (!apiKey) {
    //   throw new Error("Weather API key is not configured");
    // }

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=aeda7b0daaf670a1ded80f8faa2de10c`
    );
    return { success: true, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.statusText,
      };
    }

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

export { getCurrentWeather, getForecast };
