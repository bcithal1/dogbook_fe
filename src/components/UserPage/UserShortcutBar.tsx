import { User } from "@/types/user";
import { Flex, Button } from "@chakra-ui/react";

type UserShortcutBarProps = {
  user: User;
  setViewAbout: React.Dispatch<React.SetStateAction<boolean>>;
  setViewPets: React.Dispatch<React.SetStateAction<boolean>>;
  setViewFriends: React.Dispatch<React.SetStateAction<boolean>>;
  setViewPhotos: React.Dispatch<React.SetStateAction<boolean>>;
  setViewEvents: React.Dispatch<React.SetStateAction<boolean>>;
  setViewAwards: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserShortcutBar: React.FC<UserShortcutBarProps> = ({
  user,
  setViewAbout,
  setViewPets,
  setViewFriends,
  setViewPhotos,
  setViewEvents,
  setViewAwards,
}) => {
  const renderAbout = () => {
    setViewAbout(true);
    setViewPets(false);
    setViewFriends(false);
    setViewPhotos(false);
    setViewEvents(false);
    setViewAwards(false);
  };

  const renderPets = () => {
    setViewAbout(false);
    setViewPets(true);
    setViewFriends(false);
    setViewPhotos(false);
    setViewEvents(false);
    setViewAwards(false);
  };

  const renderFriends = () => {
    setViewAbout(false);
    setViewPets(false);
    setViewFriends(true);
    setViewPhotos(false);
    setViewEvents(false);
    setViewAwards(false);
  };

  const renderPhotos = () => {};

  const renderEvents = () => {};

  return (
    <>
      <Flex w={"full"}>
        <Button colorScheme={"blue"} onClick={renderAbout}>
          About
        </Button>
        <Button onClick={renderPets}>Pets</Button>
        <Button>Spots</Button>
        <Button onClick={renderFriends}>Friends</Button>
        <Button onClick={renderPhotos}>Photos</Button>
        <Button onClick={renderEvents}>Events</Button>
        <Button>Awards</Button>
      </Flex>
    </>
  );
};

export default UserShortcutBar;
