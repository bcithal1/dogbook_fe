import React, { useState } from "react";

import {
  ChakraProvider,
  Box,
  CircularProgress,
  ButtonGroup,
  Heading,
  FormErrorMessage,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Select,
  useToast,
  Slider,
  defineStyle,
  defineStyleConfig,
  extendTheme,
  SliderMark,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { Text, Tooltip, Flex, Button, Switch, Stack } from "@chakra-ui/react";

import { useSession } from "next-auth/react";
import { useCreateDog } from "@/queries/dog.queries";
import { disconnect } from "process";
import { Dog, Sex, Size } from "@/types/dog";

const Form1 = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading
          w="100%"
          textAlign={"center"}
          fontWeight="normal"
          color="#886E58"
        >
          Dog Registration
        </Heading>
        <Flex>
          <FormControl
            mr="5%"
            mt="5%"
            borderRadius="40px"
            borderColor="#886E58"
          >
            <FormLabel htmlFor="name" fontWeight={"normal"} borderRadius="40px">
              Name
            </FormLabel>
            <Input
              id="name"
              borderRadius="10px"
              height="25px"
              placeholder="name"
              {...register("name", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
          </FormControl>

          <FormControl mt="5%">
            <FormLabel htmlFor="breed" fontWeight={"normal"}>
              Breed
            </FormLabel>
            <Input
              id="breed"
              borderRadius="10px"
              height="25px"
              borderColor="#886E58"
              placeholder="breed"
              {...register("breed", {
                required: "This is required",
              })}
            />
          </FormControl>
        </Flex>

        <Flex>
          <FormControl mr="5%" mt="5%">
            <FormLabel htmlFor="age" fontWeight={"normal"}>
              Age
            </FormLabel>
            <Input
              id="age"
              type="number"
              borderRadius="10px"
              height="25px"
              borderColor="#886E58"
              placeholder="age"
              {...register("age", {
                required: "This is required",
              })}
            />
          </FormControl>

          <FormControl mt="5%">
            <FormLabel htmlFor="weight" fontWeight={"normal"}>
              Weight
            </FormLabel>
            <Input
              id="weight"
              type="weight"
              borderRadius="10px"
              borderColor="#886E58"
              height="25px"
              placeholder="weight"
              {...register("weight", {
                required: "This is required",
              })}
            />
          </FormControl>
        </Flex>
      </form>
    </>
  );
};

const Form2 = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading
          w="100%"
          textAlign={"center"}
          fontWeight="normal"
          mb="2%"
          color="#886E58"
        >
          Dog Details
        </Heading>
        <FormControl as={GridItem} colSpan={[6, 3]}>
          <FormLabel
            htmlFor="fixed"
            fontSize="sm"
            fontWeight="md"
            color="#886E58"
          >
            Spayed/Neutered
          </FormLabel>
          <Select
            id="fixed"
            name="fixed"
            autoComplete="fixed"
            placeholder="Select option"
            shadow="sm"
            size="sm"
            w="full"
            borderRadius="10"
            borderColor="#886E58"
            height="25px"
            {...register("fixed", {
              required: "This is required",
            })}
          >
            <option>Yes</option>
            <option>No</option>
          </Select>
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            htmlFor="size"
            fontSize="sm"
            fontWeight="md"
            color="#886E58"
            mt="2%"
          >
            Size
          </FormLabel>
          <Select
            id="fixed"
            name="fixed"
            autoComplete="fixed"
            placeholder="Select option"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            borderRadius="10"
            borderColor="#886E58"
            height="25px"
            {...register("size", {
              required: "This is required",
            })}
          >
            <option>X-Small</option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
            <option>X-Large</option>
          </Select>
        </FormControl>

        <FormControl mt="15">
          <FormLabel
            htmlFor="fixed"
            fontSize="sm"
            fontWeight="md"
            color="#886E58"
          >
            Sex
          </FormLabel>
          <Select
            id="fixed"
            name="fixed"
            autoComplete="fixed"
            placeholder="Select option"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            borderRadius="10"
            borderColor="#886E58"
            height="25px"
            {...register("sex", {
              required: "This is required",
            })}
          >
            <option>M</option>
            <option>F</option>
          </Select>
        </FormControl>

        <FormControl mr="5%" mt="5%">
          <FormLabel htmlFor="weight" fontWeight={"normal"} color="#886E58">
            Temperament:
          </FormLabel>
          <Input
            id="temperament"
            type="temperament"
            borderRadius="10px"
            borderColor="#886E58"
            height="25px"
            width="50%"
            {...register("temperament", {
              required: "This is required",
            })}
          />
        </FormControl>
        <FormControl mr="5%" mt="5%">
          <FormLabel htmlFor="weight" fontWeight={"normal"} color="#886E58">
            Personality:
          </FormLabel>
          <Input
            id="personalitypersonality"
            type="personality"
            borderRadius="10px"
            borderColor="#886E58"
            height="25px"
            width="50%"
            {...register("personality", {
              required: "This is required",
            })}
          />
        </FormControl>
      </form>
    </>
  );
};

const Form3 = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  return (
    <>
      <Heading
        w="100%"
        textAlign={"center"}
        fontWeight="normal"
        mb="2%"
        color="#886E58"
      >
        What Tricks Does Your Pup Know?
      </Heading>

      <FormControl>
        <FormLabel htmlFor="weight" fontSize="20px" color="#886E58">
          Fetch
        </FormLabel>
        <Slider
          aria-label="slider-ex-6"
          onChange={(val) => setSliderValue(val)}
          width="90%"
          mb="5%"
        >
          <SliderMark value={0} {...labelStyles}>
            Never
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            Often
          </SliderMark>
          <SliderMark value={100} {...labelStyles}>
            Always
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="weight" fontSize="20px" color="#886E58">
          Kiss
        </FormLabel>
        <Slider
          aria-label="slider-ex-6"
          onChange={(val) => setSliderValue(val)}
          width="90%"
          mb="5%"
        >
          <SliderMark value={0} {...labelStyles}>
            Never
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            Often
          </SliderMark>
          <SliderMark value={100} {...labelStyles}>
            Always
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="weight" fontSize="20px" color="#886E58">
          Speak
        </FormLabel>
        <Slider
          aria-label="slider-ex-6"
          onChange={(val) => setSliderValue(val)}
          width="90%"
          mb="5%"
        >
          <SliderMark value={0} {...labelStyles}>
            Never
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            Often
          </SliderMark>
          <SliderMark value={100} {...labelStyles}>
            Alway
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="weight" fontSize="20px" color="#886E58">
          Roll Over
        </FormLabel>
        <Slider
          aria-label="slider-ex-6"
          onChange={(val) => setSliderValue(val)}
          width="90%"
          mb="5%"
        >
          <SliderMark value={0} {...labelStyles}>
            Never
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            Often
          </SliderMark>
          <SliderMark value={100} {...labelStyles}>
            Alway
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="weight" fontSize="20px" color="#886E58">
          Play Dead
        </FormLabel>
        <Slider
          aria-label="slider-ex-6"
          onChange={(val) => setSliderValue(val)}
          width="90%"
          mb="5%"
        >
          <SliderMark value={0} {...labelStyles}>
            Never
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            Often
          </SliderMark>
          <SliderMark value={100} {...labelStyles}>
            Always
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="weight" fontSize="20px" color="#886E58">
          Hug
        </FormLabel>
        <Slider
          aria-label="slider-ex-6"
          onChange={(val) => setSliderValue(val)}
          width="90%"
          mb="5%"
        >
          <SliderMark value={0} {...labelStyles}>
            Never
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            Often
          </SliderMark>
          <SliderMark value={100} {...labelStyles}>
            Always
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="weight" fontSize="20px" color="#886E58">
          Spin
        </FormLabel>
        <Slider
          aria-label="slider-ex-6"
          onChange={(val) => setSliderValue(val)}
          width="90%"
          mb="5%"
        >
          <SliderMark value={0} {...labelStyles}>
            Never
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            Often
          </SliderMark>
          <SliderMark value={100} {...labelStyles}>
            Always
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="weight" fontSize="20px" color="#886E58">
          Shake Hands
        </FormLabel>
        <Slider
          aria-label="slider-ex-6"
          onChange={(val) => setSliderValue(val)}
          width="90%"
        >
          <SliderMark value={0} {...labelStyles}>
            Never
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            Often
          </SliderMark>
          <SliderMark value={100} {...labelStyles}>
            Alway
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
    </>
  );
};

export default function multistep() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="5px"
        backgroundColor="#F5F2EA"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={1000}
        p={6}
        m="150px auto"
        as="form"
      >
        <div>
          {" "}
          <CircularProgress color="#886E58" value={progress} />{" "}
        </div>
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                borderRadius="10"
                h="2.5rem"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                h="2.5rem"
                w="7rem"
                fontWeight="bold"
                backgroundColor="#886E58"
                color="#F5F2EA"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                borderRadius="10"
                borderColor="Transparent"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                h="2.5rem"
                w="7rem"
                backgroundColor="#886E58"
                color="#F5F2EA"
                borderColor="Transparent"
                borderRadius="10"
                variant="solid"
                onClick={() => {
                  toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
