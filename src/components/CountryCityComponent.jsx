import {Link, useParams} from "react-router-dom";

// CountryCityComponent takes the list of countries as a prop
const CountryCityComponent = ({countries}) => {
    const {iso3} = useParams();

    // Find the country with the given iso3 code
    const country = countries.find((country) => country.iso3 === iso3);
    if (!country) return <p>Country not found in database</p>;

    return (
        <div>
            <h2>All Cities for {country.country}</h2>
            <ul>
                {country.cities.map((city, index) => (
                    <li key={index}>
                        {/* Link to details of each city (if required) */}
                        <Link to={`/countries/${iso3}/cities/${city}`}>{city}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryCityComponent;
