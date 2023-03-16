import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Hidden,
	Input,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { Dog, Size } from "@/types/dog";
import { useState } from "react";
import TrickSlider from "./TrickSlider";
import Grid from "@mui/material/Unstable_Grid2";
import { useSession } from "next-auth/react";
import { useCreateDog } from "@/queries/dog.queries";
import { disconnect } from "process";
import { display } from "@mui/system";

function CreateDogForm() {
	const { data: session } = useSession();
	const createDogMutation = useCreateDog(session?.accessToken);
	//what is the benefit of specifying Dog type here?
	const [size, setSize] = useState<Dog["size"] | null>(null);
	const [altered, setAltered] = useState<Dog["altered"]>(null);
	const [weight, setWeight] = useState<Dog["weightLbs"]>(0);
	const [sex, setSex] = useState<Dog["sex"] | null>(null);
	const [breed, setBreed] = useState<Dog["breed"]>(null);
	const [age, setAge] = useState<Dog["age"]>(0);
	const [name, setName] = useState<Dog["name"]>("");
	const [alteredSelection, setAlteredSelection] = useState<string>(null);

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

	async function handleClick() {
		const dog: Dog = {
			size,
			altered,
			weightLbs: weight,
			sex,
			breed,
			age,
			name,
		};

		// TODO(Trystan): Make Trystan update backend to include this size
		// Then come back and use dogSize.
		console.log(dog);
		delete dog.size;
		try {
			await createDogMutation.mutateAsync(dog);
		} catch {
			// TODO(Trystan): Do actual handling of errors here.
		}
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
					<FormControl sx={{ color: "white" }} required={true}>
						<TextField
							required
							id="filled-hidden-label-small"
							variant="filled"
							size="medium"
							label="Name"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setName(event.target.value);
							}}
						/>
					</FormControl>
				</Grid>
				<Grid>
					<FormControl required={true}>
						<TextField
							required
							id="filled-hidden-label-small"
							variant="filled"
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
							required
							id="filled-hidden-label-small"
							variant="filled"
							size="medium"
							label="Age"
							type="number"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setAge(event.target.valueAsNumber);
							}}
						/>
					</FormControl>
				</Grid>
			</Grid>
			<Grid container spacing={10} ml={"125px"}>
				<Grid>
					<TextField
						id="filled-hidden-label-small"
						variant="filled"
						size="medium"
						label="Weight"
						type="number"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setWeight(event.target.valueAsNumber);
						}}
					/>
				</Grid>
				<Grid>
					<FormControl sx={{ minWidth: 120 }}>
						<InputLabel required id="demo-simple-select-label">
							Size
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={size}
							label="Size"
							variant="filled"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								console.log(event.target.value);
								setSize(event.target.value as Dog["size"]);
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
						<FormLabel required id="demo-radio-buttons-group-label">
							Sex
						</FormLabel>
						<RadioGroup
							row
							aria-labelledby="demo-radio-buttons-group-label"
							name="radio-buttons-group"
							sx={{ color: "white" }}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setSex(event.target.value as Dog["sex"]);
							}}
						>
							<FormControlLabel value="f" control={<Radio />} label="F" />
							<FormControlLabel value="m" control={<Radio />} label="M" />
						</RadioGroup>
					</FormControl>
				</Grid>
			</Grid>
			<Typography
				maxWidth={400}
				marginTop={8}
				marginBottom={5}
				marginLeft={"20%"}
			>
				What tricks does your pup know? Drag the slider to select how often they
				complete each trick:
			</Typography>
			<Hidden mdDown={true}>
				<Grid container spacing={9} marginLeft={"400px"}>
					<Grid>Never</Grid>
					<Grid>Sometimes</Grid>
					<Grid>Often</Grid>
					<Grid>On command</Grid>
				</Grid>
			</Hidden>
			{/* tricks aren't hooked up to anything because it isn't set up on the
			backend yet */}
			{tricks.map((trick) => (
				<TrickSlider trick={trick} />
			))}
			<Grid>
				<FormControl sx={{ minWidth: 800 }}>
					<FormLabel required id="demo-radio-buttons-group-label">
						Spayed/neutered
					</FormLabel>
					<RadioGroup
						row
						aria-labelledby="demo-radio-buttons-group-label"
						name="radio-buttons-group"
						sx={{ color: "white" }}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const newAltered = event.target.value === "yes" ? true : false;
							setAltered(newAltered);
						}}
					>
						<FormControlLabel value={true} control={<Radio />} label="Yes" />
						<FormControlLabel value={false} control={<Radio />} label="No" />
					</RadioGroup>
				</FormControl>
			</Grid>
			<Button
				onClick={handleClick}
				sx={{
					backgroundColor: "white",
					color: "black",
				}}
			>
				Create
			</Button>
		</Box>
	);
}
export default CreateDogForm;
