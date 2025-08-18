import React from "react";

const SearchBar = ({searchTerm, setSearchTerm}) =>
{
	const clearSearchBar = () => setSearchTerm("");

	return (
		<div className="search">
			<figure>
				<input type="text"
							 placeholder={`SEARCH |  Try "Gandalf" or "Deadpool"`}
							 value={searchTerm}
							 onChange={(event) => setSearchTerm(event.target.value)}/>
				<img src="./images/search.svg" alt="Search Icon" className="search-icon opacity-80" />
				<img src="./images/cancel.svg" alt="Search Icon" className="clear-icon opacity-80 cursor-pointer" onClick={clearSearchBar}/>
			</figure>
		</div>
	);
};

export default SearchBar;