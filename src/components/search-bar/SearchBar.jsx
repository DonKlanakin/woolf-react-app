import React from "react";

const SearchBar = ({searchTerm, setSearchTerm}) =>
{
	return (
		<div className="search">
			<figure>
				<img src="./images/search.svg" alt="Search Icon"/>
				<input type="text"
							 placeholder="Search through the MTG Multiverse.."
							 value={searchTerm}
							 onChange={(event) => setSearchTerm(event.target.value)}/>
			</figure>
		</div>
	);
};

export default SearchBar;