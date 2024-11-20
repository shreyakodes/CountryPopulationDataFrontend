import { Link } from "react-router-dom";

// CountryComponent takes the list of countries as a prop
const CountryComponent = ({ countries }) => {
    return (
        <div>
            <h2>All Countries</h2>
            <ul>
                {countries.map((country) => (
                    <li key={country.iso3}>
                        {/* Each country will have a link to its details page */}
                        <Link to={`/countries/${country.iso3}`}>{country.country}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryComponent;
