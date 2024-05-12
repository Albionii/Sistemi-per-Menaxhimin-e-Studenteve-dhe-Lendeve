import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 12000,
    cssEase: "linear"
  };
  return (
    <Slider {...settings} style={{width: '100%', height: '100%', color: '#fff'}}>
      <Box display={'flex'} alignItems={'center'}>
        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non arcu est. Etiam sem elit, aliquam quis malesuada condimentum, pretium nec lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam pellentesque fringilla massa quis accumsan. Maecenas ac tristique justo. Cras sodales risus quis ante ornare rutrum. Phasellus eleifend dignissim diam non auctor. Aenean porttitor ipsum eget turpis finibus, vitae blandit tortor rutrum. Donec sed convallis tortor.</h3>
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <h3>Kosova2 eshte zemra e shqiperise</h3>
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <h3>Kosova3 eshte zemra e shqiperise</h3>
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <h3>Kosova4 eshte zemra e shqiperise</h3>
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <h3>Kosova5 eshte zemra e shqiperise</h3>
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <h3>Kosova6 eshte zemra e shqiperise</h3>
      </Box>
    </Slider>
  );
}