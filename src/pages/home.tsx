import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import VideoCard from "@/components/VideoCard";
import EventList from "@/components/event/EventList";
import {
	Box,
	Center,
	ChakraProvider,
	Flex,
	Image,
	Text,
	chakra,
} from "@chakra-ui/react";
import React from "react";
import TimelinePost from "@/components/PostComponents/Post";

function home() {
	return (
		<ChakraProvider>
			<HeroSection />
			<VideoCard />

			<Center bg={"#F5F2EA"}>
				<Flex maxWidth={"500px"}>
					<chakra.h1
						textAlign={"center"}
						color={"#886E58"}
						fontSize={"4xl"}
						py={2}
						fontWeight={"bold"}
					>
						Events near YOU!
					</chakra.h1>
					<Image src="/Assets/Rectanglemap.png" title="just a mock-up"></Image>
				</Flex>
			</Center>
			<Center bg={"#F5F2EA"}>
				<Box bg={"#F5F2EA"} width={"900px"} h={"260px"} overflowY="auto" py={5}>
					<Box>
						<EventList />
					</Box>
				</Box>
			</Center>

			<Center bg={"#F5F2EA"}>
				<Flex maxWidth={"500px"}>
					<chakra.h1
						textAlign={"center"}
						color={"#886E58"}
						fontSize={"4xl"}
						py={2}
						fontWeight={"bold"}
					>
						See what users are saying:
					</chakra.h1>
				</Flex>
			</Center>

			<chakra.h1
				bg={"#F5F2EA"}
				textAlign={"center"}
				color={"#886E58"}
				fontSize={"4xl"}
				py={2}
				fontWeight={"bold"}
			>
				So many friends to meet!
			</chakra.h1>
			<Carousel
				card={{
					name: "",
					image: "",
					bio: "",
					color: "",
					href: "",
				}}
			/>
			<Footer />
		</ChakraProvider>
	);
}

export default home;
