import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import axios from "axios";

export default function SimpleSlider({ token }) {
  const [lajmet, setLajmet] = useState([]);

  useEffect(() => {
    const fetchLajmet = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/lajmet`, {
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
    <Slider {...settings} style={{ width: '100%', height: '100%', color: '#fff' }}>
      {lajmet.map(lajmi => (
        <Box key={lajmi.id} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <h3>{lajmet.length > 0 ? lajmi.mesazhi : 'Regjistroni semestrin'}</h3>
        </Box>
      ))}
    </Slider>
  );
}
