import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import heroSliderData from "../../data/hero-sliders/hero-slider-one.json";
import HeroSliderOneSingle from "../../components/hero-slider/HeroSliderOneSingle.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Base_Url } from "../../Config/config.js";

const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  navigation: true,
};

const HeroSliderOne = () => {
  const [heroSliderData, setHeroSliderData] = useState();

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const { data } = await axios.get(`${Base_Url}/api/getBanner`);
        // console.log(data);
        setHeroSliderData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProduct();
  }, []);

  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        {heroSliderData && (
          <Swiper options={params}>
            {heroSliderData.map((single, key) => (
              <SwiperSlide key={key}>
                <HeroSliderOneSingle data={single} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default HeroSliderOne;
