import { DogProfile } from "@/types/dog-profile";
import { Flex, Button } from "@chakra-ui/react";

function UserShortcutBar({ dogProfile }: { dogProfile: DogProfile }) {
	return (
		<>
			<Flex w={"full"}>
				<Button>About</Button>
				<Button>Owner</Button>
				<Button>Spots</Button>
				<Button>Friends</Button>
				<Button>Photos</Button>
				<Button>Events</Button>
			</Flex>
		</>
	);
}

export default UserShortcutBar;
