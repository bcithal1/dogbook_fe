import { Avatar, Box, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import DogProfileCarousel from "@/components/DogProfileCarousel";
import Navbar from "@/components/Navbar";
import { Dog } from "@/types/dog";
import { useRouter } from "next/router";
import ProfileSummaryBar from "@/components/dogProfileComponents/ProfileSummaryBar";
import { useGetDogById } from "@/queries/dog.queries";
import { useSession } from "next-auth/react";
import About from "@/components/dogProfileComponents/AboutDog";
import AboutDog from "@/components/dogProfileComponents/AboutDog";
import AboutParent from "@/components/dogProfileComponents/AboutParent";

function dogProfile() {
	const { query } = useRouter();
	const { data: session } = useSession();

	if (query.myParam !== undefined) {
		const id = query.myParam as unknown as number;
		const { data: dog, isSuccess } = useGetDogById(session?.accessToken, id);

		if (isSuccess) {
			return (
				<div>
					<Flex
						display={"column"}
						minH={"100vh"}
						alignItems="center"
						justifyContent="center"
						align={"center"}
						justify={"center"}
						backgroundColor={"#F5F2EA"}
					>
						<Navbar />
						<Flex>
							<ProfileSummaryBar dog={dog} />
						</Flex>

						<Flex alignItems="center" justifyContent="center">
							<AboutDog dog={dog} />
						</Flex>
						<Flex alignItems="center" justifyContent="center">
							<AboutParent />
						</Flex>
					</Flex>
				</div>
			);
		}
	}
}
export default dogProfile;
