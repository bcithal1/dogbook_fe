import Box from "@mui/material/Box";
import { RadioGroup, Slider } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";

function TrickSlider({ trick }: { trick: string }) {
	const marks = [
		{
			value: 0,
			text: "Never",
		},
		{
			value: 33,
			text: "Sometimes",
		},
		{
			value: 66,
			text: "Often",
		},
		{
			value: 100,
			text: "On Command",
		},
	];

	function valueLabelFormat(value: number) {
		return marks.filter((mark) => value === mark.value)[0].text;
	}

	return (
		<Grid container spacing={2} marginLeft="200px">
			<Grid xs={1} md={4} fontFamily={"arial"} mt={"5px"}>
				{trick}
			</Grid>
			<Grid xs={4} md={8}>
				<Slider
					aria-label="Restricted values"
					defaultValue={0}
					valueLabelFormat={valueLabelFormat}
					step={null}
					valueLabelDisplay="auto"
					marks={marks}
					sx={{ color: "white" }}
				/>
			</Grid>
		</Grid>
	);
}

export default TrickSlider;
