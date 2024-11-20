import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useQuery} from "react-query"; // React Query hook
import CountryComponent from "./components/CountryComponent.jsx";
import CountryDetailsComponent from "./components/CountryDetailsComponent.jsx";
import CityComponent from "./components/CityComponent.jsx";
import CityPopulationData from "./components/CityPopulationData.jsx";

// Fetch function to get countries
const fetchCountries = async () => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries');
    return response.json();
};

const App = () => {
    // Fetch countries once and cache the result using React Query
    const {data: countries, error, isLoading} = useQuery('getCountries', fetchCountries);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/countries" element={<CountryComponent countries={countries.data}/>}/>
                    <Route path="/countries/:iso3" element={<CountryDetailsComponent countries={countries.data}/>}/>
                    <Route path="/countries/:iso3/cities" element={<CityComponent countries={countries.data}/>}/>
                    <Route path="/countries/:iso3/cities/:city" element={<CityPopulationData/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
