import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	HStack,
	Stack,
	Button,
	Heading,
	useColorModeValue,
	RadioGroup,
	Radio,
	CheckboxGroup,
	Checkbox,
	Textarea,
	Select,
	GridItem,
	Grid,
} from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { Dog, Sex } from "@/types/dog";
import {
	useCreateDog,
	useCreateProfile,
	useUploadDogPhoto,
} from "@/queries/dog.queries";
import { useSession } from "next-auth/react";

import ImageUploadComponent from "../ImageUploadComponent";
import BreedSelect from "../BreedSelect";
import { useRouter } from "next/router";
import { DogProfile } from "@/types/dog-profile";
import { Form, Formik } from "formik";

function EditDog({ dogProfile }: { dogProfile: DogProfile }) {
	const { data: session } = useSession();

	const breed = { id: dogProfile.dog.breedId, name: dogProfile.dog.breed };

	const uploadPhotoMutation = useUploadDogPhoto(session?.accessToken);
	const createDogProfileMutation = useCreateProfile(session?.accessToken);
	const [selectedFile, setSelectedFile] = useState(null);
	const router = useRouter();

	function setAltered() {
		if (dogProfile.dog.altered === true) {
			return "true";
		} else {
			return "false";
		}
	}

	const initialValues = {
		name: dogProfile.dog.name,
		age: dogProfile.dog.age,
		weight: dogProfile.dog.weightLbs,
		altered: setAltered(),
		sex: dogProfile.dog.sex,
		size: dogProfile.dog.size,
		temperament: dogProfile.temperament,
		bio: dogProfile.bio,
	};

	function handleChange(formik, event) {
		formik.setFieldValue("breed", {
			id: event.value.id,
			name: event.value.name,
		});
	}

	async function handleClick() {
		try {
			const photoResponse = await uploadPhotoMutation.mutateAsync({
				dogId: dogProfile.dog.id,
				file: selectedFile,
			});
			const profilePhotoId = await photoResponse.data;
			dogProfile.profilePhotoId = profilePhotoId;
			const createProfileResponse = await createDogProfileMutation.mutateAsync(
				dogProfile
			);
		} catch {}
	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values) => console.log(JSON.stringify(values))}
			validationSchema={""}
		>
			{(formik) => (
				<Form>
					<Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} p={6}>
						<Stack spacing={4}>
							<HStack>
								<Box>
									<FormControl id="name" isRequired>
										<FormLabel color={"#886E58"}>Name</FormLabel>
										<Input
											name="name"
											type="text"
											onChange={formik.handleChange}
											value={formik.values.name}
										/>
									</FormControl>
								</Box>
								<Box>
									<FormControl p={2} isRequired>
										<FormLabel color={"#886E58"}>Breed</FormLabel>
										<BreedSelect
											handleChange={handleChange}
											breedSelection={breed}
										/>
									</FormControl>
								</Box>
							</HStack>
							<HStack>
								<Box>
									<FormControl id="age" isRequired>
										<FormLabel color={"#886E58"}>Age</FormLabel>
										<Input
											name="age"
											type="number"
											onChange={formik.handleChange}
											value={formik.values.age}
										/>
									</FormControl>
								</Box>
								<Box>
									<FormControl id="weight" isRequired>
										<FormLabel color={"#886E58"}>Weight</FormLabel>
										<Input
											name="weight"
											type="number"
											onChange={formik.handleChange}
											value={formik.values.weight}
										/>
									</FormControl>
								</Box>
							</HStack>
							<HStack>
								<Box>
									<FormControl id="size" isRequired>
										<FormLabel color={"#886E58"}>Size</FormLabel>
										<Select
											name="size"
											placeholder="Select option"
											onChange={formik.handleChange}
											value={formik.values.size}
										>
											<option value="TEACUP">Teacup</option>
											<option value="SMALL">Small</option>
											<option value="MEDIUM">Medium</option>
											<option value="LARGE">Large</option>
											<option value="X_LARGE">X-Large</option>
										</Select>
									</FormControl>
								</Box>
								<Box>
									<FormControl isRequired>
										<FormLabel color={"#886E58"}>Altered</FormLabel>
										<RadioGroup
											name="altered"
											onChange={formik.handleChange}
											value={formik.values.altered}
										>
											<Stack direction="row">
												<Radio value="true">Yes</Radio>
												<Radio value="false">No</Radio>
											</Stack>
										</RadioGroup>
									</FormControl>
								</Box>
								<Box>
									<FormControl isRequired>
										<FormLabel color={"#886E58"}>Sex</FormLabel>
										<RadioGroup
											name="sex"
											onChange={formik.handleChange}
											value={formik.values.sex}
										>
											<Stack direction="row">
												<Radio value="MALE">M</Radio>
												<Radio value="FEMALE">F</Radio>
											</Stack>
										</RadioGroup>
									</FormControl>
								</Box>
							</HStack>

							<Stack align={"center"}>
								<Heading fontSize={"xl"} textAlign={"center"} color={"#886E58"}>
									Tricks Known
								</Heading>
							</Stack>
							<Box pt={0} pb={2}>
								<CheckboxGroup
									colorScheme="yellow"
									defaultValue={["naruto", "kakashi"]}
								>
									<Grid templateColumns="repeat(2, 1fr)" gap={2}>
										<GridItem w="100%" h="6">
											<Checkbox value="fetch">Fetch</Checkbox>
										</GridItem>
										<GridItem w="100%" h="6">
											<Checkbox value="kiss">Kiss</Checkbox>
										</GridItem>
										<GridItem w="100%" h="6">
											<Checkbox value="speak">Speak</Checkbox>
										</GridItem>
										<GridItem w="100%" h="6">
											<Checkbox value="roll over">Roll Over</Checkbox>
										</GridItem>
										<GridItem w="100%" h="6">
											<Checkbox value="play dead">Play Dead</Checkbox>
										</GridItem>
										<GridItem w="100%" h="6">
											<Checkbox value="hug">Hug</Checkbox>
										</GridItem>
										<GridItem w="100%" h="6">
											<Checkbox value="spin">Spin</Checkbox>
										</GridItem>
										<GridItem w="100%" h="6">
											<Checkbox value="shake hands">Shake Hands</Checkbox>
										</GridItem>
									</Grid>
								</CheckboxGroup>
								<Box>
									<Heading
										fontSize={"xl"}
										color={"#886E58"}
										textAlign={"center"}
										mb="2%"
										mt="2%"
									>
										Temperament:
									</Heading>
									<FormControl id="temperament" isRequired>
										<Textarea
											name="temperament"
											placeholder="What is your dogs temper?"
											onChange={formik.handleChange}
											value={formik.values.temperament}
										/>
									</FormControl>
								</Box>
								<Box>
									<Heading
										fontSize={"xl"}
										color={"#886E58"}
										textAlign={"center"}
										mb="2%"
										mt="2%"
									>
										Bio:
									</Heading>
									<FormControl id="likes" isRequired>
										<Textarea
											name="bio"
											placeholder="Tell us about your pup"
											onChange={formik.handleChange}
											value={formik.values.bio}
										/>
									</FormControl>
								</Box>
							</Box>
						</Stack>
					</Box>
				</Form>
			)}
		</Formik>
	);
}
export default EditDog;
