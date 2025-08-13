import React from "react";

const ItemCard = ({item}) =>
{
	const BASE_URL = `https://image.tmdb.org/t/p/w500`;
	let thumbnailPath = item.poster_path;

	return (
		<div className="item-card">
			<img className="card-img-top" src={thumbnailPath ? `${BASE_URL}${thumbnailPath}` : "/images/poster-not-available.png"} />
			<li className="text-white" key={item.id}>{item.title}</li>
		</div>
	);
};

export default ItemCard;