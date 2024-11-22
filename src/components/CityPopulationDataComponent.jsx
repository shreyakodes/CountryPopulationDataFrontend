import {useQuery} from "react-query";
import {Link, useParams} from "react-router-dom";

// Fetch city data from the API
const fetchCityData = async () => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities');
    if (!response.ok) {
        throw new Error('Error fetching city data');
    }
    return response.json();
};

const CityPopulationDataComponent = ({countries}) => {
    const {city: cityName} = useParams();

    const {data: cityData, isLoading, isError} = useQuery('getCityData', fetchCityData);

    if (isLoading) return <p className="container-style">Loading...</p>;
    if (isError) return <p className="container-style">Error fetching city data</p>;

    // Matches the city name from useParams and the API
    const cityInfo = cityData?.data?.find(
        (city) => city.city.trim().toLowerCase() === cityName.trim().toLowerCase()
    );

    if (!cityInfo) {
        return <p className="container-style">City not found</p>;
    }

    // Used for /cities route as only the country name is in the API
    // Find the iso3 code from the countries data to link to the country page
    const countryData = countries.find(
        (country) => country.country.trim().toLowerCase() === cityInfo.country.trim().toLowerCase()
    );

    const iso3 = countryData?.iso3;

    return (
        <div className="container-style">
            <h1 className="heading-style">
                {/* If the country name can be found in the Countries API, it will link back to the country page*/}
                Population Data for {cityInfo.city}, {countryData ? (
                <Link
                    to={`/countries/${iso3}`}
                    className="text-blue-link">
                    {cityInfo.country}
                </Link>
            ) : (
                cityInfo.country
            )}
            </h1>
            {/* Displays city data in a table format*/}
            <table className="table-style">
                <thead>
                <tr className="table-header">
                    <th className="table-cell">Year</th>
                    <th className="table-cell">Population</th>
                    <th className="table-cell">Sex</th>
                    <th className="table-cell">Reliability</th>
                </tr>
                </thead>
                <tbody>
                {cityInfo.populationCounts.map((count, index) => (
                    <tr key={index} className="table-row">
                        <td className="table-cell">{count.year}</td>
                        <td className="table-cell">{count.value.toLocaleString()}</td>
                        <td className="table-cell">{count.sex}</td>
                        <td className="table-cell">{count.reliabilty}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CityPopulationDataComponent;
