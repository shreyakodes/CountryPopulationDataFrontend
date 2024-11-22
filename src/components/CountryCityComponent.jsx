import { Link, useParams } from "react-router-dom";

const CountryCityComponent = ({ countries }) => {
    const { iso3 } = useParams();

    // Find the country with the given iso3 code
    const country = countries.find((country) => country.iso3 === iso3);
    if (!country) return <p className="container-style">Country not found</p>;

    return (
        <div className="container-style">
            <h2 className="heading-style">All Cities for {country.country}</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {/* Retrieves and displays every city name for the associated country*/}
                {country.cities.map((city, index) => (
                    <li key={index}>
                        <Link
                            to={`/countries/${iso3}/cities/${city}`}
                            className="item"
                        >
                            {city}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryCityComponent;
