import axios from "axios";
import {useState, useEffect} from "react";
import "./index.css";
import Greeting from "./components/cards/greeting/Greeting.jsx";
import SearchBar from "./components/search-bar/SearchBar.jsx";
import Loader from "./components/Loader.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY_TMDB;
const API_OPTONS = {
	method: "GET",
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${API_KEY}`
	}
};

const App = () =>
{
	const [searchTerm, setSearchTerm] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [movieList, setMovieList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () =>
	{
		let logPrefix = "fetchData :";
		setIsLoading(true);

		try
		{
			const endpoint = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
			const responseData = await axios(endpoint, API_OPTONS);

			if (responseData.status !== 200)
			{
				throw new Error();
			}

			console.log(responseData.data.results);
			setMovieList(responseData.data.results);
		}
		catch (error)
		{
			console.debug(`${logPrefix} : ${error}.`);
			setErrorMessage("Error fetching data, please try again later.");
		}
		finally
		{
			setIsLoading(false);
		}
	};

	useEffect(() =>
	{
		fetchData();
	}, []);

	return (
		<main>
			<div className="pattern">
				<img src="./images/hero-bg.png" alt="Hero Banner"/>
			</div>
			<div className="wrapper">
				<section>
					<div className="max-w-24 mx-auto">
						<img src="./images/avatar-dk.svg" alt="The Avengers"/>
					</div>
					<div className="max-w-lg mx-auto">
						<img src="./images/hero-img.png" alt="Movie Posters"/>
					</div>
					<h1 className="text-6xl">We Have All the <span className="text-gradient">Flix!</span> You Only Need a Popcorn
						🍿 ;)</h1>
				</section>
				<section className="flex flex-col space-y-8">
					<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
					{isLoading
						? <Loader /> || <p className="text-sm text-white mx-auto my-8">Loading...</p>
						: errorMessage ? <p className="text-orange-600 mx-auto my-8">{errorMessage}</p> : ""}
				</section>
				<section className="all-movies">
					<h2 className="mt-16">Movies:</h2>
					<ul>
						{movieList.map(movie => (
							<li className="text-white" key={movie.id}>{movie.title}</li>
						))}
					</ul>
				</section>
			</div>
		</main>
	);
};

export default App;