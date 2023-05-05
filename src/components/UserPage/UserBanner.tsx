import { AddIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AiFillCamera } from "react-icons/ai";

const handleSelect = () => {};

const UserBanner = () => {
  return (
    <Box p={1}>
      <Flex px={45} w="full" alignItems="center" justifyContent="center">
        <Image
          borderRadius="md"
          width={"75%"}
          height={"auto"}
          //   maxH={"312px"}
          src="/Assets/Rika2.png"
          zIndex={0}
          alignSelf={"center"}
          justifySelf={"center"}
        />
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={<AiFillCamera />}
            colorScheme={"blue"}
            variant="solid"
            zIndex={1}
            position={"absolute"}
            h={"small"}
            w={"small"}
            justifySelf={"flex-end"}
          >
            Update Picture
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleSelect}>Select Photo</MenuItem>
            <MenuItem>Upload Photo</MenuItem>
            <MenuItem>Delete Photo</MenuItem>
            <MenuItem>Adjust Photo</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default UserBanner;
