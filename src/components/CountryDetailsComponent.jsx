import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";

// Fetch flag data from the API
const fetchCountryFlag = async (iso2) => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({iso2}),
    });

    if (!response.ok) {
        if (response.status === 404) {
            console.log(`Flag not found`);
            return {data: {flag: null}};
        }
        throw new Error(`An error occurred: ${response.statusText}`);
    }

    return response.json();
};

// Fetch capital data from the API
const fetchCountryCapital = async () => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/capital');
    if (!response.ok) {
        throw new Error('Error fetching capital');
    }
    return response.json();
};

const CountryDetailsComponent = ({countries}) => {
    const {iso3} = useParams();

    // Find the country with the given iso3 code
    const country = countries.find((country) => country.iso3 === iso3);
    if (!country) return <p>Country not found</p>;

    const {iso2, cities} = country; // Extracts information from the country object

    // Fetch flag data
    const {data: flagData, isLoading: isFlagLoading, isError: isFlagError} = useQuery(
        ['getCountryFlag', iso2],
        () => fetchCountryFlag(iso2),
        {enabled: !!iso2} // Only run if iso2 is available
    );

    // Fetch capitals data
    const {data: capitalsData, isLoading: isCapitalLoading, isError: isCapitalError} = useQuery(
        'getCapitals',
        fetchCountryCapital
    );

    if (isFlagLoading || isCapitalLoading) return <p>Loading...</p>;
    if (isFlagError || isCapitalError) return <p>Error fetching data</p>;

    // Extract flag and capital from the fetched data
    const flag = flagData?.data?.flag;
    const capital = capitalsData?.data?.find((capital) => capital.iso3 === iso3)?.capital;

    return (
        <div>
            <h1>{country.country}</h1>
            {flag ? <img src={flag} alt={country.country} width="100"/> : <p>Flag not available</p>}
            {capital ? <p>Capital: {capital}</p> : <p>Capital not available</p>}
            <p>
                Number of <Link to={`/countries/${iso3}/cities`}>cities</Link>: {cities?.length}
            </p>
        </div>
    );
};

export default CountryDetailsComponent;
