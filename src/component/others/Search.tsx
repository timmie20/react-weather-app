import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { getGeoCities } from "../../queries/geo";
import { City } from "../../types/queries";

export interface CityOption {
  value: string;
  label: string;
}

interface SearchProps {
  onSearchChange: (searchData: CityOption | null) => void;
}

const Search = ({ onSearchChange }: SearchProps) => {
  const [search, setSearch] = useState<CityOption | null>(null);

  const loadOptions = async (inputValue: string) => {
    try {
      const result = await getGeoCities(inputValue);

      if (result.success) {
        return {
          options: result.data.data.map((city: City) => ({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          })),
        };
      }
      return { options: [] };
    } catch (error) {
      console.error("Error loading cities:", error);
      return { options: [] };
    }
  };

  const handleOnChange = (searchData: CityOption | null) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
