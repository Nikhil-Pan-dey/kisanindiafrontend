import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules'; // Correct way to import modules
import data from './sliderData.js';
import './styles/slider-animation.css';
import './styles/styles.css';

const SliderComponent = () => {

    const [slider, setSlider] = useState([]);

    useEffect(() => {
        setSlider(data);
    }, []);

    return (
        <div style={{ marginTop: "40px" }}>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="swiper-container"
            >
                {slider.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        style={{ background: `url('${item.image}') no-repeat center center`, backgroundSize: 'cover' }}
                        className="swiper-slide"
                    >
                        <div className="inner">
                            <h1>{item.title}</h1>
                            <p>{item.description} <br />- {item.tag.toLowerCase()}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SliderComponent;
