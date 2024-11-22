import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useQuery} from "react-query";
import CityComponent from "./components/CityComponent.jsx";
import CountryComponent from "./components/CountryComponent.jsx";
import CountryDetailsComponent from "./components/CountryDetailsComponent.jsx";
import CountryCityComponent from "./components/CountryCityComponent.jsx";
import CityPopulationDataComponent from "./components/CityPopulationDataComponent.jsx";
import './tailwind.css';

// Fetch function to get countries
const fetchCountries = async () => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries');
    return response.json();
};

const App = () => {
    // Fetch countries once and cache the result using React Query
    const {data: countries, error, isLoading} = useQuery('getCountries', fetchCountries);

    if (isLoading) return <p className="container-style">Loading...</p>;
    if (error) return <p className="container-style">Error: {error.message}</p>;

    return (
        <Router>
            <div>
                {/* Add the navigation bar for all pages*/}
                <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 px-3 py-2 shadow-md">
                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-white text-xl font-extrabold tracking-wide">
                            Country & Population Data
                        </h1>
                        <div className="flex space-x-4">
                            <a href="/countries">
                                <button
                                    className="bg-white text-blue-600 py-1 px-4 rounded-full shadow-lg hover:bg-blue-100 hover:scale-105 transition duration-300">
                                    Countries
                                </button>
                            </a>
                            <a href="/cities">
                                <button
                                    className="bg-white text-blue-600 py-1 px-4 rounded-full shadow-lg hover:bg-blue-100 hover:scale-105 transition duration-300">
                                    Cities
                                </button>
                            </a>
                        </div>
                    </div>
                </nav>
                {/* Routes to load pages using components */}
                <Routes>
                    <Route path="/countries" element={<CountryComponent countries={countries.data}/>}/>
                    <Route path="/cities" element={<CityComponent/>}/>
                    <Route path="/cities/:city" element={<CityPopulationDataComponent countries={countries.data}/>}/>
                    <Route path="/countries/:iso3" element={<CountryDetailsComponent countries={countries.data}/>}/>
                    <Route path="/countries/:iso3/cities" element={<CountryCityComponent countries={countries.data}/>}/>
                    <Route path="/countries/:iso3/cities/:city" element={<CityPopulationDataComponent countries={countries.data}/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
