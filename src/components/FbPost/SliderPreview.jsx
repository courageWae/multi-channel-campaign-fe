import React from "react";
import tw from "tailwind-styled-components";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Model from "../PreviewModel";

const SliderPreview = ({ setSliderModel, images, videos }) => {
    return (
        <Model width={"w-11/12 max-w-xl"} setOpenModel={setSliderModel} >
            <Wrapper>

                <Carousel showThumbs={false} showStatus={false} autoPlay infiniteLoop>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`Slider preview ${index + 1}`} className="max-w-full h-96 " />
                        </div>
                    ))}
                </Carousel>

            </Wrapper>
        </Model>
    );
};

const Wrapper = tw.div``;

export default SliderPreview;
