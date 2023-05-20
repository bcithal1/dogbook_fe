import { ReactNode } from "react";
import { useRouter } from "next/router";
import {
	Box,
	Flex,
	Avatar,
	HStack,
	Link,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	Stack,
	Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { useGetUserPicByUserId } from "@/queries/user.queries";
import Loader from "./CustomComponents/Loader";

const Links = ["Events", "Notifications", "Resources", "Users"];
const NavLink = ({ children }: { children: ReactNode }) => (
	<Link
		px={2}
		py={1}
		rounded={"md"}
		_hover={{
			textDecoration: "none",
		}}
		href={"#"}
	>
		{children}
	</Link>
);

export default function Simple() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data: session } = useSession();
	const currentUserId = session?.user.id;
	const router = useRouter();
	const { data: profilePicture, isLoading: pictureIsLoading } =
		useGetUserPicByUserId(session?.accessToken, currentUserId);

	const goHome = () => {
		router.push({
			pathname: `/user-profile`,
			query: { myParam: currentUserId },
		});
	};

	if (pictureIsLoading) {
		return <Loader />;
	}

	return (
		<>
			<Box bg={"#886E58"} textColor="white" px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<IconButton
						_hover={{
							textDecoration: "none",
						}}
						bg={"#886E58"}
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack
						spacing={12}
						alignItems={"center"}
						fontWeight={"hairline"}
						fontSize={"18px"}
					>
						<Heading fontWeight={"hairline"} id="whistl">
							<Link href="/home">Whistl</Link>
						</Heading>
						<HStack
							as={"nav"}
							spacing={5}
							display={{ base: "none", md: "flex" }}
						>
							{Links.map((link, index) => (
								<Link key={index} href={`/${link.toLowerCase()}`}>
									{link}
								</Link>
							))}
						</HStack>
					</HStack>

					<Flex alignItems={"center"}>
						<Menu>
							<MenuButton
								as={Button}
								rounded={"full"}
								variant={"link"}
								cursor={"pointer"}
								minW={0}
							>
								<Avatar
									size={"md"}
									src={`data:image/png;base64, ${profilePicture}`}
									css={{
										border: "1px solid #886E58",
									}}
									boxShadow={
										"0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
									}
								/>
							</MenuButton>
							<MenuList textColor={"black"}>
								<Heading as="h4" size="md" ml="2%">
									{session?.user?.name}
								</Heading>
								<MenuDivider />
								<MenuItem onClick={goHome}>Go to Profile</MenuItem>
								<MenuDivider />
								<MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
									Sign out
								</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							{Links.map((link, index) => (
								<NavLink key={index}>{link}</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
}
