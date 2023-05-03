import { useGetBreedList } from "@/queries/dog.queries";
import { Breed } from "@/types/breed";
import { Spinner } from "@chakra-ui/react";
import { Select as ChakraReactSelect } from "chakra-react-select";
import { useSession } from "next-auth/react";

function BreedSelect({ handleChange, breedSelection }) {
	const { data: session } = useSession();
	const { data: breedList, isSuccess } = useGetBreedList(session?.accessToken);

	if (isSuccess) {
		const options = breedList.map((breed) => {
			console.log(breedSelection);
			const breedOption = { value: breed, label: breed.name };
			return breedOption;
		});

		const newOptions = [
			...options,
			{ value: { id: 0, name: "Other" }, label: "Other" },
		];

		return (
			<ChakraReactSelect
				name="breed"
				options={newOptions}
				placeholder="Breed"
				closeMenuOnSelect={true}
				size="md"
				onChange={handleChange}
				defaultValue={breedSelection}
			/>
		);
	} else {
		return <Spinner />;
	}
}

export default BreedSelect;
