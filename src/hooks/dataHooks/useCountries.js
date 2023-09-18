import { useQuery } from "react-query";
import {countryService} from "../../services/CountryService.js";
const useCountries = () => {
    const { data: countriesData, ...queryInfo } = useQuery(
        ["countries"],
        () => countryService.getAll(),
        {
            enabled: true,
            initialData: [],
        }
    );

    const countryOptions = countriesData ? countriesData.map(country => ({
        value: country.id,
        label: country.name,
    })) : [];

    return { countryOptions, ...queryInfo };
}

export default useCountries;
