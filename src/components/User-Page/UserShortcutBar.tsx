import { Flex, Button } from "@chakra-ui/react";

function UserShortcutBar() {
  return (
    <>
      <Flex w={"full"}>
        <Button>About</Button>
        <Button>Pets</Button>
        <Button>Spots</Button>
        <Button>Friends</Button>
        <Button>Photos</Button>
        <Button>Events</Button>
        <Button>Awards</Button>
      </Flex>
    </>
  );
}

export default UserShortcutBar;
