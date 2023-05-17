import { useGetDogPhoto } from "@/queries/dog.queries";
import { DogProfile } from "@/types/dog-profile";
import { Avatar, Spinner } from "@chakra-ui/react";

function DogProfilePhotoForEvent({
	dogProfile,
	accessToken,
}: {
	dogProfile: DogProfile;
	accessToken: string;
}) {
	const { status, data } = useGetDogPhoto(accessToken, dogProfile.profilePhotoId);

	if (status === "loading") {
		return <Spinner></Spinner>;
	}

	if (status === "success") {
		return (
			<Avatar
				size={"md"}
				src={`data:image/png;base64, ${data}`}
				title={dogProfile.dog.name}
				css={{
					border: "5px solid #886E58",
					marginTop: "5px",
				}}
				boxShadow={
					"0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
				}
			/>
		);
	}
}
export default DogProfilePhotoForEvent;