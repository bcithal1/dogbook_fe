import CreateDogForm from "@/components/CreateDogForm";
import { Box } from "@mui/material";

export default function CreateDog() {
	return (
		<div>
			<h1>Add a dog</h1>
			<Box
				display="flex"
				m="auto"
				sx={{
					width: "1042px",
					height: "1122px",
					backgroundColor: "#886E58",
					marginTop: "100px",
				}}
			>
				<CreateDogForm />
			</Box>
		</div>
	);
}
