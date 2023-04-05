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
	Code,
	Theme,
} from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { Dog, Sex } from "@/types/dog";
import { useCreateDog } from "@/queries/dog.queries";
import { useSession } from "next-auth/react";
import {
	CreatableSelect,
	AsyncSelect,
	ChakraStylesConfig,
} from "chakra-react-select";
import { Select as ChakraReactSelect } from "chakra-react-select";

function SignupCard() {
	const [value, setValue] = React.useState("1");

	const { data: session } = useSession();
	const createDogMutation = useCreateDog(session?.accessToken);
	const [size, setSize] = useState<Dog["size"] | null>(null);
	const [altered, setAltered] = useState<Dog["altered"]>(null);
	const [weight, setWeight] = useState<Dog["weightLbs"]>(null);
	const [sex, setSex] = useState<Dog["sex"] | null>(null);
	const [breed, setBreed] = useState<Dog["breed"]>(null);
	const [age, setAge] = useState<Dog["age"]>(null);
	const [name, setName] = useState<Dog["name"]>("");
	const [sexSelection, setSexSelection] = useState<string>(null);

	async function handleClick() {
		console.log("hello");
		const dog: Dog = {
			size,
			altered,
			weightLbs: weight,
			sex,
			breed,
			age,
			name,
		};

		console.log(dog);
		try {
			await createDogMutation.mutateAsync(dog);
		} catch {}
	}

	const colorOptions = [
		{ value: "blue", label: "Blue", color: "#0052CC" },
		{ value: "purple", label: "Purple", color: "#5243AA" },
		{ value: "red", label: "Red", color: "#FF5630" },
		{ value: "orange", label: "Orange", color: "#FF8B00" },
		{ value: "yellow", label: "Yellow", color: "#FFC400" },
		{ value: "green", label: "Green", color: "#36B37E" },
	];

	return (
		<Flex
			id="backdrop"
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			backgroundColor={"#F5F2EA"}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"} color={"#886E58"}>
						Create Dog
					</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl id="firstName" isRequired>
									<FormLabel color={"#886E58"}>Name</FormLabel>
									<Input
										type="text"
										onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
											setName(event.target.value);
										}}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl p={4} isRequired>
									<FormLabel color={"#886E58"}>Breed</FormLabel>
									<ChakraReactSelect
										name="colors"
										options={colorOptions}
										placeholder="Type breed"
										closeMenuOnSelect={true}
										onChange={handleClick}
										size="md"
									/>
								</FormControl>
							</Box>
						</HStack>
						<HStack>
							<Box>
								<FormControl id="age" isRequired>
									<FormLabel color={"#886E58"}>Age</FormLabel>
									<Input
										type="number"
										onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
											setAge(event.target.valueAsNumber);
										}}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl id="weight" isRequired>
									<FormLabel color={"#886E58"}>Weight</FormLabel>
									<Input
										type="number"
										onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
											setWeight(event.target.valueAsNumber);
										}}
									/>
								</FormControl>
							</Box>
						</HStack>
						<HStack>
							<Box>
								<FormControl id="size" isRequired>
									<FormLabel color={"#886E58"}>Size</FormLabel>
									<Select
										placeholder="Select option"
										onChange={(event) => {
											console.log(event.target.value);
											setSize(event.target.value as Dog["size"]);
										}}
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
								<FormControl id="size" isRequired>
									<FormLabel color={"#886E58"}>Altered</FormLabel>
									<RadioGroup
										onChange={(value) => {
											const newAltered = value === "true" ? true : false;
											setAltered(newAltered);
										}}
									>
										<Stack direction="row">
											<Radio value="true">Yes</Radio>
											<Radio value="false">No</Radio>
										</Stack>
									</RadioGroup>
								</FormControl>
							</Box>
							<Box>
								<FormControl id="size" isRequired>
									<FormLabel color={"#886E58"}>Sex</FormLabel>
									<RadioGroup
										onChange={(value) => {
											const newSex = value === "M" ? Sex.MALE : Sex.FEMALE;
											setSex(newSex);
										}}
									>
										<Stack direction="row">
											<Radio value="M">M</Radio>
											<Radio value="F">F</Radio>
										</Stack>
									</RadioGroup>
								</FormControl>
							</Box>
						</HStack>

						<Stack align={"center"}>
							<Heading fontSize={"4xl"} textAlign={"center"} color={"#886E58"}>
								Tricks Known
							</Heading>
						</Stack>
						<Box pt={6} pb={2}>
							<CheckboxGroup
								colorScheme="yellow"
								defaultValue={["naruto", "kakashi"]}
							>
								<Stack spacing={[1, 5]} direction={["row", "column"]}>
									<Checkbox value="fetch">Fetch</Checkbox>
									<Checkbox value="kiss">Kiss</Checkbox>
									<Checkbox value="speak">Speak</Checkbox>
									<Checkbox value="roll over">Roll Over</Checkbox>
									<Checkbox value="play dead">Play Dead</Checkbox>
									<Checkbox value="hug">Hug</Checkbox>
									<Checkbox value="spin">Spin</Checkbox>
									<Checkbox value="shake hands">Shake Hands</Checkbox>
								</Stack>
							</CheckboxGroup>
							<Box>
								<Heading
									fontSize={"2xl"}
									color={"#886E58"}
									textAlign={"center"}
									mb="5%"
									mt="5%"
								>
									Temperament:
								</Heading>
								<FormControl id="temperament" isRequired>
									<Textarea placeholder="What is your dogs temper?" />
								</FormControl>
							</Box>
							<Box>
								<Heading
									fontSize={"2xl"}
									color={"#886E58"}
									textAlign={"center"}
									mb="5%"
									mt="5%"
								>
									What I Like:
								</Heading>
								<FormControl id="likes" isRequired>
									<Textarea placeholder="What is your dog looking for in a friend?" />
								</FormControl>
							</Box>
						</Box>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText="Submitting"
								size="lg"
								bg={"#886E58"}
								color={"white"}
								_hover={{
									bg: "#735238",
								}}
								onClick={handleClick}
							>
								Create Dog
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}

export default SignupCard;
