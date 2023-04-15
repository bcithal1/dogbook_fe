import Navbar from "@/components/Navbar";
import UserBanner from "@/components/User-Page/UserBanner";
import UserOverView from "@/components/User-Page/UserOverview";
import UserProfilePhoto from "@/components/User-Page/UserProfilePhoto";
import UserShortcutBar from "@/components/User-Page/UserShortcutBar";
import UserSideBar from "@/components/User-Page/UserSideBar";
import { Container, useBreakpointValue } from "@chakra-ui/react";

function userProfile() {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  return (
    <>
      <Navbar />
      <Container maxW="container.xl" backgroundColor={"#F5F2EA"} rounded={"lg"}>
        <UserOverView />
        <UserShortcutBar />
        <UserSideBar />
      </Container>
    </>
  );
}

export default userProfile;
