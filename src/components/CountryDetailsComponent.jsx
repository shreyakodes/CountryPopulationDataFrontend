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
const fetchCountryPopulation = async () => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/population');
    if (!response.ok) {
        throw new Error('Error fetching total population');
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
    if (!country) return <p className="container-style">Country not found</p>;

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

    // Fetch population data
    const {data: populationData, isLoading: isPopulationLoading, isError: isPopulationError} = useQuery(
        'getCountryPopulation',
        fetchCountryPopulation
    );
    if (isFlagLoading || isCapitalLoading || isPopulationLoading) return <p className="container-style">Loading...</p>;
    if (isFlagError || isCapitalError || isPopulationError) return <p className="container-style">Error fetching data</p>;

    // Extract flag and capital from the fetched data
    const flag = flagData?.data?.flag;
    const capital = capitalsData?.data?.find((capital) => capital.iso3 === iso3)?.capital;
    const populationInfo = populationData?.data?.find((item) => item.country === country.country)?.populationCounts;

    // Get the most recent population
    const latestPopulation = populationInfo?.[populationInfo.length - 1];

    return (
        <div className="container-style space-y-2 flex items-center space-x-1">
            <div className="w-1/2 space-y-2" >
            <h1 className="text-2xl font-bold text-blue-600">{country.country}</h1>
            {flag ? (<img src={flag} alt={country.country} width="150" className="rounded-lg shadow-md"/>) : (
                <p className="text-red-500 px-0.5">Flag not available</p>)}
            </div>
            <div className="w-1/2 space-y-2">
                {capital ? (
                    <p className="text-lg font-medium text-gray-700">Capital: <span
                        className="font-normal">{capital}</span>
                    </p>) : (<p className="text-red-500">Capital not available</p>)}
                <p className="text-lg font-semibold text-gray-700">
                    Number of <Link to={`/countries/${iso3}/cities`}
                                    className="text-blue-link"> cities</Link>
                    : <span
                    className="font-normal">{cities.length} </span>
                </p>
                {latestPopulation && (<p className="text-lg font-semibold text-gray-700">Total Population
                    ({latestPopulation.year}): <span
                        className="font-normal"> {latestPopulation.value.toLocaleString()} </span></p>)}
            </div>
        </div>
);
};

export default CountryDetailsComponent;
