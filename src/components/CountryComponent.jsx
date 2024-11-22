import {Link} from "react-router-dom";

const CountryComponent = ({countries}) => {
    return (
        <div className="container-style">
            <h2 className="heading-style">All Countries</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {/* Retrieves and displays every country name*/}
                {countries.map((country) => (
                    <li key={country.iso3}>
                        <Link
                            to={`/countries/${country.iso3}`}
                            className="item">
                            {country.country}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryComponent;
