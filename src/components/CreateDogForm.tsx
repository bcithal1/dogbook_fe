import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	TextField,
} from "@mui/material";
import { Dog, Size } from "@/types/dog";
import { useState } from "react";
import TrickSlider from "./TrickSlider";
import Grid from "@mui/material/Unstable_Grid2";

function CreateDogForm() {
	const [size, setSize] = useState("");
	const [altered, setAltered] = useState(undefined);
	const [weight, setWeight] = useState(undefined);
	const [sex, setSex] = useState(undefined);
	const [breed, setBreed] = useState("");
	const [age, setAge] = useState(undefined);
	const [name, setName] = useState("");

	const tricks = [
		"Fetch",
		"Kiss",
		"Speak",
		"Roll over",
		"Play dead",
		"Hug",
		"Spin",
		"Shake hands",
	];

	function handleClick() {
		console.log(size, altered, weight, sex, breed, age, name);
	}
	return (
		<Box
			alignItems="center"
			justifyContent="center"
			fontFamily={"arial"}
			mt={"15px"}
		>
			<Grid container spacing={10} ml={"125px"}>
				<Grid>
					<FormControl>
						<TextField
							id="filled-hidden-label-small"
							variant="outlined"
							size="medium"
							label="Name"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setName(event.target.value);
							}}
						/>
					</FormControl>
				</Grid>
				<Grid>
					<FormControl>
						<TextField
							id="filled-hidden-label-small"
							variant="outlined"
							size="medium"
							label="Breed"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setBreed(event.target.value);
							}}
						/>
					</FormControl>
				</Grid>
				<Grid>
					<FormControl>
						<TextField
							id="filled-hidden-label-small"
							variant="outlined"
							size="medium"
							label="Age"
							type="number"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setAge(event.target.value);
							}}
						/>
					</FormControl>
				</Grid>
			</Grid>
			<Grid container spacing={10} ml={"125px"}>
				<Grid>
					<TextField
						id="filled-hidden-label-small"
						variant="outlined"
						size="medium"
						label="Weight"
						type="number"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setWeight(event.target.value);
						}}
					/>
				</Grid>
				<Grid>
					<FormControl sx={{ minWidth: 120 }}>
						<InputLabel id="demo-simple-select-label">Size</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={size}
							label="Size"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setSize(event.target.value);
							}}
						>
							<MenuItem value={"s"}>S</MenuItem>
							<MenuItem value={"m"}>M</MenuItem>
							<MenuItem value={"l"}>L</MenuItem>
							<MenuItem value={"xl"}>XL</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid>
					<FormControl>
						<FormLabel id="demo-radio-buttons-group-label">Sex</FormLabel>
						<RadioGroup
							row
							aria-labelledby="demo-radio-buttons-group-label"
							name="radio-buttons-group"
							sx={{ color: "white" }}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setSex(event.target.value);
							}}
						>
							<FormControlLabel value="female" control={<Radio />} label="F" />
							<FormControlLabel value="male" control={<Radio />} label="M" />
						</RadioGroup>
					</FormControl>
				</Grid>
			</Grid>

			<h4>
				What tricks does your pup know? Drag the slider to select how often they
				complete each trick:
			</h4>
			<Grid container spacing={9} marginLeft={"400px"}>
				<Grid>Never</Grid>
				<Grid>Sometimes</Grid>
				<Grid>Often</Grid>
				<Grid>On command</Grid>
			</Grid>
			{tricks.map((trick) => (
				<TrickSlider trick={trick} />
			))}
			<FormControl sx={{ minWidth: 200 }}>
				<InputLabel id="select-fixed">Spayed/neutered</InputLabel>
				<Select
					labelId="select-fixed"
					id="select-fixed"
					value={altered}
					label="Spayed/neutered"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setAltered(event.target.value);
					}}
				>
					<MenuItem value={"yes"}>Yes</MenuItem>
					<MenuItem value={"no"}>No</MenuItem>
				</Select>
			</FormControl>
			<Button onClick={handleClick}>Create</Button>
		</Box>
	);
}
export default CreateDogForm;
