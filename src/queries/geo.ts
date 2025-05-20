import axios, { AxiosError } from "axios";
import { ApiError, ApiResponse, CityDataProps } from "../types/queries";

const apiUrl = import.meta.env.VITE_RAPID_API_KEY;

const getGeoCities = async (
  nameInput: string
): Promise<ApiResponse<CityDataProps> | ApiError> => {
  try {
    const res = await axios.get(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${nameInput}`,
      {
        headers: {
          "x-rapidapi-key": `${apiUrl}`,
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        },
      }
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
      message: "An unexpected error occurred",
    };
  }
};

export { getGeoCities };
