import React from 'react';
import { Box, IconButton, Stack, useBreakpointValue, Image, SimpleGrid, Grid, GridItem, Container } from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {

  return (
    <>
        <div className="image-container">
            <div className="gallery">
                <figure className="gallery__item gallery__item--1">
                    <img src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Gallery image 1" className="gallery__img" />
                </figure>
                <figure className="gallery__item gallery__item--2">
                    <img src="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Gallery image 2" className="gallery__img" />
                </figure>
                <figure className="gallery__item gallery__item--3">
                    <img src="https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Gallery image 3" className="gallery__img" />
                </figure>
                <figure className="gallery__item gallery__item--4">
                    <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Gallery image 4" className="gallery__img" />
                </figure>
                <figure className="gallery__item gallery__item--5">
                    <img src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Gallery image 5" className="gallery__img" />
                </figure>
                <figure className="gallery__item gallery__item--6">
                    <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Gallery image 6" className="gallery__img" />
                </figure>
            </div>
        </div>
    </>
  );
}