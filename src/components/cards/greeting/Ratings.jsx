import {useState, useEffect} from "react";

const Ratings = ({title}) =>
{
	const [hasLiked, setHasLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(0);

	useEffect(() =>
	{
		console.log(`${title} ${hasLiked ? "has a new like!" : "has been unliked."}`);
		console.log(`${title} has ${likeCount} total likes.`);
	}, [likeCount]);

	return (
		<div className={"item-card"}>
			<h1>{title}</h1>
			<div className="caption-likes">
				<span className={"likes-count"}>{likeCount} likes</span>
				<button className={"button-like"} onClick={() =>
				{
					setHasLiked(prevState => !prevState);
					setLikeCount(prevLike => prevLike + 1);
				}}>{hasLiked ? "♥️" : "🤍"}</button>
			</div>
		</div>
	);
};

export default Ratings;