import CreateDogForm from "@/components/CreateDogForm";
import withAuth from "@/components/withAuth";
import { Box } from "@mui/material";

function CreateDog() {
	return (
		<div>
			<Box
				display="flex"
				m="auto"
				sx={{
					backgroundColor: "#886E58",
					marginTop: "100px",
				}}
			>
				<CreateDogForm />
			</Box>
		</div>
	);
}

export default withAuth(CreateDog);
