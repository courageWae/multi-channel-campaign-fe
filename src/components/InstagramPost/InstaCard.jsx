import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { useSelector } from "react-redux";
import SliderPreview from '../FbPost/SliderPreview';
import Images from 'Images';

const Card = tw.div`border rounded-lg shadow w-full bg-white mb-4`;
const CardHeader = tw.div`flex items-center justify-between px-4 py-3 border-b`;
const Avatar = tw.img`w-8 h-8 rounded-full`;
const CardContent = tw.div`p-4 flex`;
const CardStats = tw.div`flex justify-between px-4 border-t py-2 mt-2 bg-gray-100`;
const StatItem = tw.div`flex flex-col items-left font-medium text-gray-700 text-base`;
const CardFooter = tw.div`flex justify-between items-center border-t px-4 py-2 text-gray-700`;
const CardImage = tw.img`object-cover rounded w-full h-full`;
const Button = tw.button`border rounded py-1 px-3 text-gray-500`;
const Image = tw.img`w-5 h-5 mr-2 mt-0.5`;
const TextContent = tw.p`w-full w-9/12 overflow-y-auto`;

const InstaCard = () => {
    const user = useSelector((state) => state.UserReducer.user);
    const images = [
        "https://via.placeholder.com/80",
        "https://via.placeholder.com/80",
        "https://via.placeholder.com/80",
        "https://via.placeholder.com/80",
    ];
    const [sliderModel, setSliderModel] = useState(false);
    const cards = [
        { id: 1, content: "Thought of the day Embrace each moment with gratitude. #gratitude #positivity #mindfulness #blessed #inspiration", images: images },
        { id: 2, content: "Thought of the day Embrace each moment with gratitude. #gratitude #positivity #mindfulness #blessed #inspiration" },
    ];

    const renderImages = (images) => {
        if (images.length === 1) {
            return (
                <div className="w-full h-24">
                    <CardImage src={images[0]} alt="Dashboard" />
                </div>
            );
        } else {
            return (
                <div className="grid w-full h-24 grid-cols-2 gap-1">
                    {images.slice(0, 2).map((image, index) => (
                        <CardImage key={index} src={image} alt="Dashboard" />
                    ))}
                </div>
            );
        }
    };

    return (
        <>
            {sliderModel && (
                <SliderPreview
                    setSliderModel={setSliderModel}
                    images={images}
                />
            )}
            {cards.map((card) => (
                <Card key={card.id}>
                    <CardHeader>
                        <div className="flex items-center">
                            <Avatar src="https://via.placeholder.com/40" alt="Avatar" />
                            <div className="ml-3">
                                <p className="text-gray-500 text-[15px]">You created this today at 11:46 AM</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <TextContent>{card.content}</TextContent>
                        {card.images && (
                            <div className="w-3/12" onClick={() => {
                                setSliderModel(true);
                            }}>
                                {renderImages(card.images)}
                            </div>
                        )}
                    </CardContent>
                    <CardStats>
                        <StatItem>
                            <span>Likes</span>
                            <span className='font-semibold'>0</span>
                        </StatItem>
                        <StatItem>
                            <span>Comments</span>
                            <span className='font-semibold'>0</span>
                        </StatItem>
                        <StatItem>
                            <span>Shares</span>
                            <span className='font-semibold'>0</span>
                        </StatItem>
                        <StatItem>
                            <span>Clicks</span>
                            <span className='font-semibold'>0</span>
                        </StatItem>
                        <StatItem>
                            <span>Reach</span>
                            <span className='font-semibold'>0</span>
                        </StatItem>
                    </CardStats>
                    <CardFooter>
                        <span className="flex text-sm"><Image src={Images.adBlack} /> Shared via Adsevo today at 11:46 AM</span>
                        <div className="flex items-center">
                            <div className="ml-2">
                                <button className="mr-2 text-base font-medium text-gray-600">View Post</button>
                                <Button>Share Link</Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </>
    );
};

export default InstaCard;
