import axios from "axios";
import {useState, useEffect} from "react";
import {useDebounce} from "react-use";
import "./index.css";
import SearchBar from "./components/search-bar/SearchBar.jsx";
import Loader from "./components/Loader.jsx";
import ItemCard from "./components/item-card/ItemCard.jsx";

const API_BASE_URL = "https://api.scryfall.com/cards";
const API_KEY = import.meta.env.VITE_API_KEY_TMDB;
const API_OPTIONS = {
	method: "GET",
	headers: {
		"Accept": "application/json;q=0.9,*/*;q=0.8"
		//Authorization: `Bearer ${API_KEY}`
	}
};

const App = () =>
{
	// State fields
	const [searchTerm, setSearchTerm] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [itemList, setItemList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [debounced, setDebounced] = useState("");

	useDebounce(() =>
	{
		setDebounced(searchTerm);
	}, 800, [searchTerm]);

	const fetchData = async (query = "") =>
	{
		setIsLoading(true);
		setErrorMessage("");
		console.log(isLoading);
		let logPrefix = "fetchData :";
		let dataObj = {};

		try
		{
			let endpoint = query
				? `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`
				: `${API_BASE_URL}/search?order=released&q=*`;
			const responseData = await axios(endpoint, API_OPTIONS);
			const dataObj = responseData.data.data;

			if (responseData.status !== 200)
			{
				throw new Error();
			}

			setItemList(dataObj);
		}
		catch (error)
		{
			console.debug(`${logPrefix} : ${error}.`);
			setErrorMessage(`${error.toString()
															.includes("404") ? "Item not found" : "Error fetching data"}, Let's try again!`);
		}
		finally
		{
			setIsLoading(false);
		}

		return dataObj;
	};

	useEffect(() =>
	{
		fetchData(debounced);
	}, [debounced]);

	return (
		<main>
			<div className="pattern">
				<img src="images/Babe984goqiqwuefhcosb_1920x1000.jpg" alt="Hero Banner"/>
			</div>
			<div className="wrapper">
				<section>
					<div className="max-w-[3.2rem]">
						<img src="images/avatar-dk-outlined.svg" alt="DK Signature"/>
					</div>
					<div className="max-w-lg mx-auto mb-8">
						<img src="images/spm_home_logoupdate.webp" alt="Marvel's Spiderman Logo"/>
						<h1 className="text-6xl text-center">Release Date: <span className="text-gradient">September 26</span></h1>
						<h2 className="text-3xl text-center">FRIENDLY. AMAZING. SPECTACULAR!</h2>
						<h3 className="text-xl text-light-100 text-center">Thwip into our newest set! Magic: The Gathering |
							Marvel's Spider-Man slings cards from across the Spider-Man universe into your favorite decks.</h3>
					</div>
				</section>
				<section className="flex flex-col space-y-8">
					<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
					<div className="h-[0.6rem] mx-auto">
						{isLoading
							? <Loader/> || <p className="text-sm text-white mx-auto">Loading...</p>
							: errorMessage ? <p className="text-orange-600 mx-auto">{errorMessage}</p> : ""}
					</div>
				</section>
				<section className="all-items">
					<h2 className="mt-16">Search Results:</h2>
					<ul>
						{itemList.map(item => (
							<ItemCard key={item.id} item={item}/>
						))}
					</ul>
				</section>
			</div>
		</main>
	);
};

export default App;