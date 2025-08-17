import React from "react";

const ItemCard = ({item, onClick}) =>
{
	const handleOnClick = (item) => {
		onClick(item);
	}

	try
	{
		// const BASE_URL = `https://api.scryfall.com`;
		let thumbnailPath = item.image_uris.small || "/images/poster-not-available.png";

		return (
			<div className="item-card cursor-pointer" onClick={() => handleOnClick(item)}>
				<img src={thumbnailPath ? `${thumbnailPath}` : "/images/poster-not-available.png"} alt="artwork"/>
				<h3 className="mt-4">{item.name}</h3>
				<div className="content mx-auto justify-between">
					<div className="rating">
						<img src="images/star.svg" alt="star"/>
						<p className="text-sm text-light-100">{item.rarity}</p>
					</div>

					<div className="year">
						<p>{item.released_at}</p>
					</div>

				</div>
			</div>
		);
	}
	catch (error)
	{
		console.debug(error);
	}
};

export default ItemCard;