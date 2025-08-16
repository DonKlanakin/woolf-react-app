import React from "react";

const ItemCard = ({item}) =>
{
	try
	{
		// const BASE_URL = `https://api.scryfall.com`;
		let thumbnailPath = item.image_uris.small || "/images/poster-not-available.png";

		return (
			<div className="item-card">
				<img src={thumbnailPath ? `${thumbnailPath}` : "/images/poster-not-available.png"} alt="artwork"/>
				<h3 className="mt-4">{item.name}</h3>
			</div>
		);
	}
	catch (error)
	{
		console.error(error);
	}
};

export default ItemCard;