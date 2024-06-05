import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import axios from "axios";

export default function SimpleSlider({ token }) {
  const [lajmet, setLajmet] = useState([]);

  useEffect(() => {
    const fetchLajmet = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/student/lajmet`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLajmet(response.data);
      } catch (error) {
        console.error("There was an error fetching lajmet!", error);
      }
    };
    fetchLajmet();
  }, [token]);

  const settings = {
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
    <Box style={{ width: '100%', color: '#fff' }}>
      {lajmet.length > 0 ? (
        <Slider {...settings}>
          {lajmet.map(lajmi => (
            <Box key={lajmi.id}>
              <Typography variant="h6">{lajmi.mesazhi}</Typography>
            </Box>
          ))}
        </Slider>
      ) : (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'100%'}>
          <Typography variant="h6">Ju nuk keni regjistruar semestrin apo nuk ka lajme momentalisht</Typography>
        </Box>
      )}
    </Box>
  );
}
