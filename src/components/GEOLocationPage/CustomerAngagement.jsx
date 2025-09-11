import React, { useState } from "react";
import Images from "Images";
import Config from "Config";

const BulkSMSFeatures = () => {
    const cards = [
        {
            imageSrc: Images.Cust,
            subtitle: "Paid",
            title: "Stay connected at every touchpoint",
            learn: "Signup Free",
            url: "/register",
            description: (
                <>
                    Password resets, order confirmations or shipping updates, our API delivers the right email at the right time.

                </>
            ),
        },
        {
            imageSrc: Images.Cust1,
            subtitle: "Paid",
            title: "Sevo works with what you know",
            learn: "Signup Free",
            url: "/register",
            description: (
                <>
                    PHP, Node or Python – our API libraries support the most common programming languages.

                </>
            ),
        },
        {
            imageSrc: Images.Cust2,
            subtitle: "Paid",
            title: "Manage campaigns on a single platform",
            learn: "Signup Free",
            url: "/register",
            description: (
                <>
                    Trigger transactional emails, send marketing campaigns, and track customer interactions — all with Sevo.

                </>
            ),
        },
        // Other card objects...
    ];

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState("");

    const toggleModal = (videoUrl = "") => {
        setSelectedVideoUrl(videoUrl);
        setModalIsOpen(!modalIsOpen);
    };

    return (
        <div className="relative">
            <div className="Container py-6 lg:py-12">

                <div className="mt-16">
                    {cards.map((card, i) => (
                        <div key={i} className={`mt-24 ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} md:flex justify-center items-center`}>
                            <div className="mt-4 md:mt-0 md:max-w-xl mx-4 sm:mx-8 md:mx-4 lg:mx-12">
                                <h4 className="text-xl md:text-2xl font-medium text-orange-500 leading-tight">{card.title}</h4>
                                <p className="mt-2 text-medium font-normal text-gray-600">{card.description}</p>
                                {card.learn && (
                                    <a href={card.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm cursor-pointer text-white rounded-full bg-orange-500 hover:bg-orange-500 hover:text-white transition duration-300 border border-orange-500 py-2 px-4 hover:border-orange-500">
                                        {card.learn}
                                    </a>
                                )}
                            </div>
                            {card.imageSrc && <div className=" md:w-1/2 lg:w-5/12 xl:w-5/12 flex-shrink-0 h-80 md:h-96 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-12  lg:my-0 rounded-tl-[100px] rounded-br-[100px] border border-orange-500" style={{ backgroundImage: `url(${card.imageSrc})` }}></div>}

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BulkSMSFeatures;
