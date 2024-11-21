import {Link} from "react-router-dom";
import {useQuery} from "react-query";

// Fetch function to get cities
const fetchCities = async () => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities');
    return response.json();
};

const CityComponent = () => {
    // Fetch cities once and cache the result using React Query
    const {data: cities, error, isLoading} = useQuery('getCities', fetchCities);

    if (isLoading) return <p className="container-style">Loading...</p>;
    if (error) return <p className="container-style">Error: {error.message}</p>;

    return (
        <div className="container-style">
            <h2 className="heading-style">All Cities</h2>
            <ul className="list">
                {cities.data.map((city) => {
                    return (
                        <li key={city.city}>
                            <Link
                                to={`/cities/${city.city}`}
                                className="item"
                            >
                                {city.city}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CityComponent;
