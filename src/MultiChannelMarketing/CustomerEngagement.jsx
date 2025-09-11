import React from "react";
import tw from "tailwind-styled-components";
import { cards } from "MultiChannelMarketing/data";
const Features = ({ channel }) => {
  const cardData = cards.features;

  return (
<div className="relative">
  <div className="Container max-w-7xl mx-auto py-12 lg:py-12">
    <div className="mt-48 h-fit">
      {cardData.map((card, i) => (
        <div
          key={i}
          className={`mt-48 h-full ${
            i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
          } md:flex justify-between items-start`}
        >
          <div className="md:max-w-xl flex-grow mx-4 sm:mx-4 md:mx-3 lg:mx-8">
            <div className="grid grid-cols-1 h-full gap-3">
              {card.properties[1] && (
                <div>
                  <div className="col-span-1 flex flex-col justify-between h-full">
                    <div className="flex flex-col justify-between h-full">
                      <h4 className="text-3xl tracking-wide uppercase md-3xl text-left font-bold text-black leading-tight">
                        {card.title}
                      </h4>
                      <div className="h-1 bg-orange-500 rounded-full w-24 mt-2 mb-5 "></div>

                      <div>
                        <div className="flex gap-1 items-center justify-start mb-3">
                          <div className="flex items-center justify-center bg-orange-100 w-12 h-12 rounded-md mr-3">
                            <img
                              src={card.properties[1].emoji}
                              width="30px"
                              alt="benefit-icon"
                            />
                          </div>
                          <SubTitle>{card.properties[1].title}</SubTitle>
                        </div>
                      </div>
                      {card.properties[1].title === "Functionality" &&
                        card.properties[1].description.map((item, index) => (
                          <div key={index} className="flex-grow">
                            <ListIcon className="w-full hover:shadow-lg transition duration-300 hover:scale-105 rounded-lg p-2 mb-3 h-42 flex flex-col justify-between">
                              {/* <p className="text-orange-500 font-semibold text-md mb-2">
                                <span className="text-gray-600 text-lg">
                                  {item.topHeading}
                                </span>
                              </p> */}
                              <p className="text-gray-600 text-md flex-grow">
                                {item.description}
                              </p>
                            </ListIcon>
                          </div>
                        ))}
                      <div>
                        <div className="flex gap-1 items-center justify-start mb-3">
                          <div className="flex items-center justify-center bg-orange-100 w-12 h-12 rounded-md mr-3">
                            <img
                              src={card.properties[0].emoji}
                              width="30px"
                              alt="use-case-icon"
                            />
                          </div>
                          <SubTitle>{card.properties[0].title}</SubTitle>
                        </div>
                      </div>
                      {card.properties[0].title === "Benefits" &&
                        card.properties[0].description.map((item, index) => (
                          <div key={index} className="flex-grow">
                            <ListIcon className="w-full bg-white hover:shadow-lg transition duration-300 hover:scale-105 rounded-lg p-2 mb-3 h-42 flex flex-col justify-between">
                              {/* <p className="text-orange-500 font-semibold text-md mb-2">
                                <span className="text-gray-600 text-lg">
                                  {item.topHeading}
                                </span>
                              </p> */}
                              <p className="text-gray-600 text-md flex-grow">
                                {item.description}
                              </p>
                            </ListIcon>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="mt-3 text-lg font-normal text-gray-600">
              {card.description}
            </p>
            {card.learn && (
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm cursor-pointer text-white rounded-full bg-orange-500 hover:bg-orange-500 hover:text-white transition duration-300 border border-orange-500 py-2 px-6 hover:border-orange-500"
              >
                {card.learn}
              </a>
            )}
          </div>

          {card.videoSrc && (
            <div className="md:w-1/2 lg:w-6/12 xl:w-6/12 md:h-96 h-96 flex-shrink-0 mx-4 sm:mx-4 md:mx-6 lg:mx-4 lg:my-0 rounded-tl-[50px] rounded-br-[50px] border border-orange-500 overflow-hidden">
              {card.videoSrc.includes("youtube.com") ||
              card.videoSrc.includes("youtu.be") ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${
                    card.videoSrc.split("v=")[1]
                  }`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  src={card.videoSrc}
                  className="w-full h-full object-cover"
                  controls
                ></video>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

const SubTitle = tw.h4`text-xl font-bold text-gray-700 mt-2`;
const ListIcon = tw.div`text-md`;

export default Features;
