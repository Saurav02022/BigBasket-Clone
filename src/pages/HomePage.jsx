import { useState, useEffect } from "react";

import { Box, Image } from "@chakra-ui/react";

import { Bank } from "./Data/Bank";
import { store } from "./Data/store";
import { offer } from "./Data/topOffer";
import { brand } from "./Data/brand.js";
import { firstCarousel } from "./Data/Carousel";
import { mostPopular } from "./Data/most Popular";

import FourCards from "../components/FourCards";

const Home = () => {
  const [firstImage, setFirstImage] = useState(0);

  useEffect(() => {
    const Id = setInterval(() => {
      if (firstCarousel.length - 1 === firstImage) {
        setFirstImage(0);
        return;
      }
      setFirstImage(firstImage + 1);
    }, 1500);

    return () => clearInterval(Id);
  }, [firstImage]);

  return (
    <div>
      <Box>
        <Image
          src={firstCarousel[firstImage]}
          alt="carouselImage"
          width="100%"
        />
      </Box>

      <FourCards data={Bank} text="Bank Offers" key={"Bank Offers"} />
      <FourCards data={mostPopular} text="Most Popular" key="Most Popular" />
      <FourCards data={offer} text="Top Offers" key="Top offres" />
      <FourCards data={store} text="Store" key="Store" />
      <FourCards data={brand} xl={"6"} text="Brand Store" key="Brand Store" />
    </div>
  );
};

export default Home;
