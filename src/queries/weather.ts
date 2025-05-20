import axios, { AxiosError } from "axios";
import {
  ApiError,
  ApiResponse,
  ForecastResponse,
  WeatherData,
} from "../types/queries";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getCurrentWeather = async (
  lat: number,
  lon: number
): Promise<ApiResponse<WeatherData> | ApiError> => {
  try {
    if (!apiKey) {
      throw new Error("Weather API key is not configured");
    }

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
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
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
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
