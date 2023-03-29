import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Container,
  Image,
  Flex,
  Spacer,
} from "@chakra-ui/react";
// react-icons package for the icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// react-slick as Carousel Lib
import Slider from "react-slick";

type Card = {
  name: string;
  image: string;
  color: string;
};

interface ProjectProps {
  card: Card;
}

// Settings for the slider
const settings = {
  dots: true,
  arrows: true,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function LargeCarousel({ card }: ProjectProps) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "50%", md: "50%" });
  const side = useBreakpointValue({ base: "1%", md: "21px" });

  // This list contains all the data for the carousel
  const cards: Card[] = [
    {
      name: "Blake enjoying the forest",
      image: "/Assets/LargeDogs/Blake1.png",
      color: "#886E58",
    },
    {
      name: "Blake enjoying the forest",
      image: "/Assets/LargeDogs/Blake2.png",
      color: "#886E58",
    },
    {
      name: "Blake enjoying the forest",
      image: "/Assets/LargeDogs/Blake3.png",
      color: "#886E58",
    },
    {
      name: "Blake enjoying the forest",
      image: "/Assets/LargeDogs/Blake4.png",
      color: "#886E58",
    },
  ];

  return (
    <Flex
      justify="space-evenly"
      justifyContent="center"
      maxHeight="540px"
      mb="50px"
      gap="9"
    >
      <Box
        position={"relative"}
        maxHeight={"570px"}
        maxWidth={"630px"}
        overflow={"hidden"}
        verticalAlign={"center"}
      >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          colorScheme="black"
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <IoIosArrowBack size="30px" color="white" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          colorScheme="black"
          aria-label="right-arrow"
          position="absolute"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <IoIosArrowForward size="30px" color="white" />
        </IconButton>
        {/* Slider setting */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((card, index) => (
            <Box
              key={index}
              rounded="sm"
              borderRadius={21}
              overflow={"hidden"}
              bg={card.color}
            >
              {/* customize the image, bio and link to profile */}
              <Container size="container.lg" height="440px" mb="21px">
                {/* pup name heading */}

                <Flex
                  maxHeight="450px"
                  mt={"45px"}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  verticalAlign="center"
                >
                  <Spacer />
                  <Stack w={"full"}>
                    <Box display="flex" justifyContent="center">
                      <Heading
                        fontSize={{ base: "2xl", md: "3xl", lg: "3.5xl" }}
                        color="white"
                      >
                        {card.name}
                      </Heading>
                    </Box>
                  </Stack>

                  {/* pup pic */}
                  <Box
                    rounded={21}
                    my={3}
                    mx={[0, 5]}
                    boxShadow={
                      "0px 1px 25px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
                    }
                  >
                    <Image
                      verticalAlign="center"
                      rounded="18px"
                      src={card.image}
                      title={card.name}
                      objectFit="cover"
                      maxH="400px"
                    />
                  </Box>
                </Flex>
              </Container>
            </Box>
          ))}
        </Slider>
      </Box>
    </Flex>
  );
}
