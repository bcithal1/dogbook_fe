import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Link,
  Flex,
  Image,
  Spacer,
} from "@chakra-ui/react";
// react-icons package for the icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// react-slick as Carousel Lib
import Slider from "react-slick";

type Card = {
  name: string;
  image: string;
  bio: string;
  color: string;
  href: string;
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

export default function UserProfileCarousel({ card }: ProjectProps) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "50%", md: "50%" });
  const side = useBreakpointValue({ base: "1%", md: "21px" });

  // This list contains all the data for the carousel as an example
  // the data will be pulled dynamically from DB once the back-end is done
  const cards: Card[] = [
    {
      name: "Tommy",
      bio: "Tommy is crazy, of course sassy and cute! Just lookin for a good time!",
      image: "/Assets/smalldog1.png",
      href: "https://unsplash.com/s/photos/dog",
      color: "#886E58",
    },

    {
      name: "Fluffy",
      bio: "Fluffy is looking for a playmate.  ",
      image: "/Assets/smalldog2.png",
      href: "https://unsplash.com/s/photos/dog",
      color: "#886E58",
    },
    {
      name: "Sparkles",
      bio: "Sparkles is kind, loving and is looking for long walks on the beach and quality time!",
      image: "/Assets/sparkles.jpg",
      href: "https://unsplash.com/s/photos/dog",
      color: "#886E58",
    },
    {
      name: "Billy",
      bio: "Billy is looking for just a couple meetups. Nothing serious.  ",
      image: "/Assets/smalldog7.png",
      href: "https://unsplash.com/s/photos/dog",
      color: "#886E58",
    },
    {
      name: "Fang",
      bio: "Fang is crazy, of course sassy and cute! Just lookin for a good time!",
      image: "/Assets/smalldog4.png",
      href: "https://unsplash.com/s/photos/dog",
      color: "#886E58",
    },
    {
      name: "Bella",
      bio: "Bella is playful, sassy and cute! Just lookin for a good time!",
      image: "/Assets/smalldog5.png",
      href: "https://unsplash.com/s/photos/dog",
      color: "#886E58",
    },
  ];

  return (
    <Flex justify="space-evenly" justifyContent="center" wrap="wrap" gap="9" bg={"#F5F2EA"}>
      <Box
      
        position={"relative"}
        maxHeight={"420px"}
        maxWidth={"300px"}
        overflow={"hidden"}
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
          aria-label="right-arrow"
          colorScheme="black"
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
              mb="21px"
            >
              {/* customize the image, bio and link to profile */}
              <Container size="container.lg" height="372px" mb="21px">
                {/* pup name heading */}

                <Flex
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  height="inherit"
                >
                  <Spacer />
                  <Stack w={"full"}>
                    <Box display="flex" justifyContent="center" mt="30px">
                      <Heading
                        fontSize={{ base: "3xl", md: "3.5xl", lg: "4xl" }}
                        color="white"
                      >
                        {card.name}
                      </Heading>
                    </Box>
                  </Stack>

                  {/* pup pic */}
                  <Box
                    rounded={21}
                    my={10}
                    mx={[0, 5]}
                    boxShadow={
                      "0px 1px 25px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
                    }
                  >
                    <Image
                      verticalAlign="center"
                      rounded="18px"
                      src={card.image}
                      alt={card.name}
                      objectFit="cover"
                      maxH="165px"
                    />
                  </Box>

                  {/* puppy bio */}
                  <Stack w={"90%"} maxW={"95%"} transform="translate(0, -50%)">
                    {/* pup bio */}
                    <Text fontSize={"12px"} color="white" textAlign={"center"}>
                      {card.bio}
                    </Text>
                  </Stack>
                  {/* <Spacer /> */}
                  <Stack bottom="1%" transform="translate(0, -50%)">
                    {/* link to pup profile */}
                    <Text align="center" fontSize={"11px"} fontWeight="bold">
                      <Link
                        color={"white"}
                        href={card.href}
                        title={card.name}
                        textDecoration={"none"}
                      >
                        Check me out!
                      </Link>
                    </Text>
                  </Stack>
                  <Spacer />
                </Flex>
              </Container>
            </Box>
          ))}
        </Slider>
      </Box>
    </Flex>
  );
}
