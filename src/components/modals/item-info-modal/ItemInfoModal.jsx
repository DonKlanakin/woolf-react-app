import * as React from "react";
import {useContext} from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {ItemInfoModalContext} from "../../contexts/ItemInfoModalContext.jsx";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	height: "80%",
	width: "60%",
	bgcolor: "#0D1323",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4
};

export default function ItemInfoModal()
{
	const {isItemInfoModelOpen, setIsItemInfoModelOpen, selectedItem} = useContext(ItemInfoModalContext);
	const handleClose = () => setIsItemInfoModelOpen(false);

	// Item info
	const artwork = selectedItem ? selectedItem.image_uris.large : "/images/image-not-available.svg";
	// const name = selectedItem ? selectedItem.name : "n/a";
	// const typeLine = selectedItem ? selectedItem.type_line : "n/a";
	// const oracleText = selectedItem ? selectedItem.oracle_text : "n/a";
	// const flavorText = selectedItem ? selectedItem.flavor_text : "n/a";

	return (
		<div className="z-50">
			{/*<Button onClick={handleOpen}>Open modal</Button>*/}
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={isItemInfoModelOpen}
				onClose={handleClose}
				onClick={handleClose}
				closeAfterTransition
				slots={{backdrop: Backdrop}}
				slotProps={{
					backdrop: {
						timeout: 500
					}
				}}
			>
				<Fade in={isItemInfoModelOpen}>
					<Box sx={style}>
						<div className="flex flex-col">
							<img src={artwork} alt="artwork" className="max-h-[32rem] rounded-[2rem] mx-auto mt-8"/>
							<img src={"images/avatar-dk-outlined.svg"} alt="DK" className="max-w-[2.4rem] mx-auto mt-12 opacity-20"/>
							<h3 className="text-gray-700 mx-auto mt-2">.: Powered by DK :.</h3>
							{/*<div className="mx-auto mt-4">*/}
							{/*	<div className="text-lg text-white font-bold line-clamp-1 text-light-100">*/}
							{/*		{name}*/}
							{/*	</div>*/}
							{/*	<div className="text-light-200">*/}
							{/*		<span className="mb-2">{typeLine}</span>*/}
							{/*	</div>*/}
							{/*</div>*/}
						</div>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
