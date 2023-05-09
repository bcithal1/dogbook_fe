import { Container, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import DogProfileCarousel from "@/components/DogProfileCarousel";
import Navbar from "@/components/Navbar";
import { Dog } from "@/types/dog";
import { useRouter } from "next/router";
import { useGetDogById } from "@/queries/dog.queries";
import { useSession } from "next-auth/react";
import About from "@/components/dogProfileComponents/AboutDog";
import AboutDog from "@/components/dogProfileComponents/AboutDog";
import AboutParent from "@/components/dogProfileComponents/AboutParent";
import DogProfile from "@/components/dogProfileComponents/DogProfile";

function dogProfile() {
	const { query } = useRouter();

	if (query.myParam !== undefined) {
		const id = query.myParam as unknown as number;

		return (
			<div>
				<DogProfile dogId={id} />
			</div>
		);
	}
}
export default dogProfile;
