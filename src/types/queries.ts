export interface ApiError {
  success: false;
  message: string;
  statusCode?: number;
}

export interface ApiResponse<T> {
  success: true;
  message?: string;
  data: T;
}

export interface City {
  latitude: number;
  longitude: number;
  name: string;
  countryCode: string;
}

export interface CityDataProps {
  data: City[];
}
