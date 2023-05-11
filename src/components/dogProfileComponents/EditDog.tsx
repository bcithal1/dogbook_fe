import {
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
	ModalBody,
	ModalFooter,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { useUpdateDogProfile } from "@/queries/dog.queries";

import BreedSelect from "../BreedSelect";
import { DogProfile } from "@/types/dog-profile";
import { Form, Formik } from "formik";

function EditDog({
	dogProfile,
	accessToken,
	handleFormSubmission,
}: {
	dogProfile: DogProfile;
	accessToken: string;
	handleFormSubmission;
}) {
	const [breed, setBreed] = useState(dogProfile.dog.breed);
	const [breedId, setBreedId] = useState(dogProfile.dog.breedId);
	const breedSelection = { id: breedId, name: breed };

	const updateDogProfile = useUpdateDogProfile(accessToken);
	const [loading, setLoading] = useState(false);

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
		tricks: dogProfile.dog.tricks,
	};

	function handleChange(event) {
		setBreed(event.value.name);
		setBreedId(event.value.id);
	}

	useEffect(() => {
		if (updateDogProfile.isSuccess) {
			handleFormSubmission();
		}
		setLoading(false);
	}, [updateDogProfile.isSuccess]);

	async function handleSubmit(formValues) {
		const profileData: DogProfile = {
			id: dogProfile.id,
			profilePhotoId: dogProfile.profilePhotoId,
			dog: {
				id: dogProfile.dog.id,
				name: formValues.name,
				breed: breed,
				breedId: breedId,
				size: formValues.size,
				sex: formValues.sex,
				altered: formValues.altered,
				weightLbs: formValues.weight,
				age: formValues.age,
				tricks: formValues.tricks,
			},
			temperament: formValues.temperament,
			bio: formValues.bio,
		};
		setLoading(true);
		await updateDogProfile.mutateAsync(profileData);
	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={""}
		>
			{(formik) => (
				<Form>
					<ModalBody>
						<Box
							rounded={"lg"}
							bg={useColorModeValue("white", "gray.700")}
							p={6}
						>
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
												breedSelection={breedSelection}
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
													<Radio value="true" onChange={formik.handleChange}>
														Yes
													</Radio>
													<Radio value="false" onChange={formik.handleChange}>
														No
													</Radio>
												</Stack>
											</RadioGroup>
										</FormControl>
									</Box>
									<Box>
										<FormControl isRequired>
											<FormLabel color={"#886E58"}>Sex</FormLabel>
											<RadioGroup name="sex" value={formik.values.sex}>
												<Stack direction="row">
													<Radio value="MALE" onChange={formik.handleChange}>
														M
													</Radio>
													<Radio value="FEMALE" onChange={formik.handleChange}>
														F
													</Radio>
												</Stack>
											</RadioGroup>
										</FormControl>
									</Box>
								</HStack>

								<Stack align={"center"}>
									<Heading
										fontSize={"xl"}
										textAlign={"center"}
										color={"#886E58"}
									>
										Tricks Known
									</Heading>
								</Stack>
								<Box pt={0} pb={2}>
									<CheckboxGroup
										colorScheme="yellow"
										value={formik.values.tricks}
									>
										<Grid templateColumns="repeat(2, 1fr)" gap={2}>
											<GridItem w="100%" h="8">
												<Checkbox
													name="tricks"
													value="Fetch"
													onChange={formik.handleChange}
												>
													Fetch
												</Checkbox>
											</GridItem>
											<GridItem w="100%" h="10">
												<Checkbox
													onChange={formik.handleChange}
													name="tricks"
													value="Kiss"
												>
													Kiss
												</Checkbox>
											</GridItem>
											<GridItem w="100%" h="10">
												<Checkbox
													onChange={formik.handleChange}
													name="tricks"
													value="Speak"
												>
													Speak
												</Checkbox>
											</GridItem>
											<GridItem w="100%" h="10">
												<Checkbox
													name="tricks"
													value="Roll over"
													onChange={formik.handleChange}
												>
													Roll over
												</Checkbox>
											</GridItem>
											<GridItem w="100%" h="10">
												<Checkbox
													onChange={formik.handleChange}
													name="tricks"
													value="Play dead"
												>
													Play dead
												</Checkbox>
											</GridItem>
											<GridItem w="100%" h="10">
												<Checkbox
													name="tricks"
													value="Hug"
													onChange={formik.handleChange}
												>
													Hug
												</Checkbox>
											</GridItem>
											<GridItem w="100%" h="10">
												<Checkbox
													onChange={formik.handleChange}
													name="tricks"
													value="Spin"
												>
													Spin
												</Checkbox>
											</GridItem>
											<GridItem w="100%" h="10">
												<Checkbox
													onChange={formik.handleChange}
													name="tricks"
													value="Shake hands"
												>
													Shake hands
												</Checkbox>
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
					</ModalBody>
					<ModalFooter marginTop={-9}>
						<Button
							type="submit"
							backgroundColor={"#886E58"}
							color={"white"}
							mr={3}
							isLoading={loading}
						>
							Save changes
						</Button>
						<Button color={"#886E58"} variant="ghost" type="submit">
							Cancel
						</Button>
					</ModalFooter>
				</Form>
			)}
		</Formik>
	);
}
export default EditDog;
