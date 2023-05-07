import { useGetBreedList } from "@/queries/dog.queries";
import { Select as ChakraReactSelect } from "chakra-react-select";
import { useSession } from "next-auth/react";
import Loader from "./CustomComponents/Loader";

function BreedSelect({ handleChange }) {
  const { data: session } = useSession();
  const { data: breedList, isSuccess } = useGetBreedList(session?.accessToken);

  if (isSuccess) {
    const options = breedList.map((breed) => {
      const breedOption = { value: breed, label: breed.name };
      return breedOption;
    });

    const newOptions = [
      ...options,
      { value: { id: 0, name: "Other" }, label: "Other" },
    ];

    return (
      <ChakraReactSelect
        name="colors"
        options={newOptions}
        placeholder="Breed"
        closeMenuOnSelect={true}
        size="md"
        onChange={handleChange}
      />
    );
  } else {
    return <Loader />;
  }
}

export default BreedSelect;
