// Fetch function to get countries
import {Link} from "react-router-dom";
import {useQuery} from "react-query";

const fetchCities = async () => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities');
    return response.json();
};

const CityComponent = () => {
    // Fetch countries once and cache the result using React Query
    const {data: cities, error, isLoading} = useQuery('getCities', fetchCities);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Cities</h1>
            <ul>
                {cities.data.map((city) => {
                    return (
                        <li key={city.city}>
                            <Link to={`/cities/${city.city}`}>{city.city}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default CityComponent;