import React from "react";

const ItemCard = ({item}) =>
{
	const BASE_URL = `https://image.tmdb.org/t/p/w500`;
	let thumbnailPath = item.poster_path;

	return (
		<div className="item-card">
			<img src={thumbnailPath ? `${BASE_URL}${thumbnailPath}` : "/images/poster-not-available.png"} />
			<h3 className="mt-4" key={item.id}>{item.title}</h3>
		</div>
	);
};

export default ItemCard;