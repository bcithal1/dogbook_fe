import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import async from "react-select/dist/declarations/src/async/index";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

type PlacesProps = {
  setLocation: (position: google.maps.LatLngLiteral, address:string) => void;
};

function places({ setLocation }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [selected, setSelected] = useState<string|null>(null)


  const handleSelect = async (e) => {
    console.log(e.target.value);
    setValue(e.target.value, false);
    setSelected(e.target.value)
    clearSuggestions();
    const results = await getGeocode({ address: e.target.value });
    console.log(results)
    const { lat, lng } = await getLatLng(results[0]);
    setLocation({ lat, lng }, selected);
  };

  console.log(status, data);
  return (
    <FormControl>
      <FormLabel>Pick Event Location</FormLabel>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="search an address"
      />
      <FormHelperText>suggestions</FormHelperText>
      {/* <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Actions
        </MenuButton>
        <MenuList>
          {status==="OK" && data.map(({place_id, description})=>(<MenuItem onSelect={handleSelect} bgColor={"grey"} color="teal.200" key={place_id} value={description}>{description}</MenuItem>))}
        </MenuList>
      </Menu> */}

      <Select placeholder="Select option" onChange={handleSelect} value={selected}>
      {status==="OK" && data.map(({place_id, description})=>(<option color="teal.200" key={place_id} value={description}>{description}</option>))}
      </Select>
    </FormControl>
  );
}

export default places;
