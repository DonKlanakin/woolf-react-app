import axios from "axios";
import {useState, useEffect} from "react";
import "./index.css";
import SearchBar from "./components/search-bar/SearchBar.jsx";
import Loader from "./components/Loader.jsx";
import ItemCard from "./components/item-card/ItemCard.jsx";

const API_BASE_URL = "https://api.scryfall.com/cards/search?order=cmc&q=c%3Ared+pow%3D3";
const API_KEY = import.meta.env.VITE_API_KEY_TMDB;
const API_OPTIONS = {
	method: "GET",
	headers: {
		"Accept": "application/json;q=0.9,*/*;q=0.8",
		//Authorization: `Bearer ${API_KEY}`
	}
};

const App = () =>
{
	const [searchTerm, setSearchTerm] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [itemList, setItemList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async () =>
	{
		setIsLoading(true);
		let logPrefix = "fetchData :";
		let dataObj = {};

		try
		{
			const endpoint = `${API_BASE_URL}`;
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
			setErrorMessage("Error fetching data, please try again later.");
		}
		finally
		{
			setIsLoading(false);
		}

		return dataObj;
	};

	useEffect(() =>
	{
		fetchData()
			.then( r => console.debug("fetchData :", r));
	}, []);

	return (
		<main>
			<div className="pattern">
				<img src="./images/Babe984goqiqwuefhcosb_1920x1000.jpg" alt="Hero Banner"/>
			</div>
			<div className="wrapper">
				<section>
					<div className="max-w-[3.2rem]">
						<img src="./images/DK.svg" alt="DK Signature"/>
					</div>
					<div className="max-w-lg mx-auto">
						<img src="./images/spm_home_logoupdate.webp" alt="Marvel's Spiderman Logo"/>
						<h1 className="text-6xl text-center">Release Date: <span className="text-gradient">September 26</span></h1>
						<h2 className="text-3xl text-center">FRIENDLY. AMAZING. SPECTACULAR!</h2>
						<h3 className="text-xl text-light-100 text-center">Thwip into our newest set! Magic: The Gathering | Marvel's Spider-Man slings cards from across the Spider-Man universe into your favorite decks.</h3>
					</div>
				</section>
				<section className="flex flex-col space-y-8">
					<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
					{isLoading
						? <Loader/> || <p className="text-sm text-white mx-auto my-8">Loading...</p>
						: errorMessage ? <p className="text-orange-600 mx-auto my-8">{errorMessage}</p> : ""}
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