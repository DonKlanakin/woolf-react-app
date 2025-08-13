import React from "react";

const ItemCard = ({item}) =>
{
	return (
		<div>
			<li className="text-white" key={item.id}>{item.title}</li>
		</div>
	);
};

export default ItemCard;