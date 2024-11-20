import {useQuery} from "react-query";
import {useParams} from "react-router-dom";

const fetchCityData = async () => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities');
    if (!response.ok) {
        throw new Error('Error fetching city data');
    }
    return response.json();
};

const CityPopulationData = () => {
    const {city: cityName} = useParams();

    const {data: cityData, isLoading, isError} = useQuery('getCityData', fetchCityData);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching city data</p>;

    console.log("URL City Name:", cityName); // Log cityName from the URL
    console.log("API Data:", cityData?.data); // Log API response for debugging

    // Normalize the city name from useParams and the API for matching
    const normalizedCityName = cityName.trim().toLowerCase();
    const cityInfo = cityData?.data?.find(
        (city) => city.city.trim().toLowerCase() === normalizedCityName
    );

    if (!cityInfo) {
        console.log("City not found:", normalizedCityName);
        return <p>City not found</p>;
    }

    return (
        <div>
            <h1>Population Data for {cityInfo.city}, {cityInfo.country}</h1>
                {cityInfo.populationCounts.map((count, index) => (
                    <li key={index}>
                        <p>Year: {count.year}</p>
                        <p>Population: {count.value}</p>
                        <p>Sex: {count.sex}</p>
                        <p>Reliability: {count.reliabilty}</p>
                    </li>
                ))}
        </div>
    );
};

export default CityPopulationData;
