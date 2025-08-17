import * as React from 'react';
import {useState, useContext} from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ItemInfoModalContext} from "../../contexts/ItemInfoModalContext.jsx";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function ItemInfoModal() {
	//const [open, setOpen] = useState(false);
	const { isItemInfoModelOpen, setIsItemInfoModelOpen } = useContext(ItemInfoModalContext);
	const handleOpen = () => setIsItemInfoModelOpen(true);
	const handleClose = () => setIsItemInfoModelOpen(false);

	return (
		<div className="z-50">
			<Button onClick={handleOpen}>Open modal</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={isItemInfoModelOpen}
				onClose={handleClose}
				onClick={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={isItemInfoModelOpen}>
					<Box sx={style}>
						<Typography id="transition-modal-title" variant="h6" component="h2" className="text-gray-800">
							Title
						</Typography>
						<Typography id="transition-modal-description" sx={{ mt: 2 }}>
							Description.
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
