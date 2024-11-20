import {useQuery} from "react-query";
import {Link, useParams} from "react-router-dom";

const fetchCityData = async () => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities');
    if (!response.ok) {
        throw new Error('Error fetching city data');
    }
    return response.json();
};

const CityPopulationData = ({countries}) => {
    const {city: cityName} = useParams();

    const {data: cityData, isLoading, isError} = useQuery('getCityData', fetchCityData);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching city data</p>;

    // Normalize the city name from useParams and the API for matching
    const normalisedCityName = cityName.trim().toLowerCase();
    const cityInfo = cityData?.data?.find(
        (city) => city.city.trim().toLowerCase() === normalisedCityName
    );

    if (!cityInfo) {
        console.log("City not found:", normalisedCityName);
        return <p>City not found</p>;
    }

    // Find the iso3 code from the countries data
    const normalisedCountryName = cityInfo.country.trim().toLowerCase();
    const countryData = countries.find(
        (country) => country.country.trim().toLowerCase() === normalisedCountryName
    );

    const iso3 = countryData?.iso3;

    return (
        <div>
            <h1>
                Population Data for {cityInfo.city}, {countryData ? (<Link to={`/countries/${iso3}`}>{cityInfo.country}</Link>) : (cityInfo.country)}
            </h1>
            <ul>
                {cityInfo.populationCounts.map((count, index) => (
                    <li key={index}>
                        <p>Year: {count.year}</p>
                        <p>Population: {count.value}</p>
                        <p>Sex: {count.sex}</p>
                        <p>Reliability: {count.reliability}</p> {/* Fixed typo here */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CityPopulationData;
