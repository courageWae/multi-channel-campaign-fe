import React from "react";
import { Link } from "react-router-dom";
import { features } from "./data";
import { IoSettingsOutline } from "react-icons/io5";
import { GiProfit } from "react-icons/gi";
import GetStarted from "./GetStarted";

const Features = () => {

  const firstFiveFeatures = features.slice(0, 5);
  const lastFiveFeatures = features.slice(5, features.length);
  return (
    <>
    <div className="relative overflow-hidden bg-white">
      <div className="pt-8 pb-80 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-10">
        {firstFiveFeatures.map((feature, index) => {
          const isOdd = index % 2 !== 0;
          
          return (
            <div
              key={index}
              className="relative max-w-6xl py-12 mx-auto Container lg:py-12"
            >
              <div className={`flex flex-col ${isOdd ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-between`}>
                <div className="px-4 sm:max-w-lg lg:w-1/2">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {feature.title}
                  </h1>
                  <p className="w-full mt-4 text-xl text-gray-500">{feature.useCase}</p>
                  <div className="flex flex-col gap-4 mt-8">
                    <div className="flex items-center gap-3 h-fit">
                      <div className="flex items-center justify-center p-6 border border-gray-400 rounded-md">
                        <IoSettingsOutline className="text-3xl text-gray-600" />
                      </div>
                      <div className="flex flex-col mb-3">
                        <p className="text-lg font-bold text-gray-600">
                          Mechanics
                        </p>
                        <p className="font-medium text-gray-500 text-md">
                          {feature.mechanics}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-4 mt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center p-6 border border-gray-400 rounded-md">
                        <GiProfit className="text-3xl text-gray-600" />
                      </div>
                      <div className="flex flex-col mb-3">
                        <p className="text-lg font-bold text-gray-600">
                          Benefit
                        </p>
                        <p className="font-medium text-gray-500 text-md">
                          {feature.benefit}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/register"
                    className="inline-block px-8 py-3 mt-6 font-medium text-center text-white bg-orange-600 border border-transparent rounded-md hover:bg-black-900"
                  >
                    Sign up Free
                  </Link>
                </div>

                <div className={`mt-10 lg:w-1/2 px-4 relative`}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <GetStarted/>
    <div className="relative overflow-hidden bg-white">
      <div className="pt-16 pb-80 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        {lastFiveFeatures.map((feature, index) => {
          const isOdd = index % 2 !== 0;
          
          return (
            <div
              key={index}
              className="relative max-w-6xl py-12 mx-auto Container lg:py-12"
            >
              <div className={`flex flex-col ${isOdd ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-between`}>
                <div className="px-4 sm:max-w-lg lg:w-1/2">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {feature.title}
                  </h1>
                  <p className="w-full mt-4 text-xl text-gray-500">{feature.useCase}</p>
                  <div className="flex flex-col gap-4 mt-8">
                    <div className="flex items-center gap-3 h-fit">
                      <div className="flex items-center justify-center p-6 border border-gray-400 rounded-md">
                        <IoSettingsOutline className="text-3xl text-gray-600" />
                      </div>
                      <div className="flex flex-col mb-3">
                        <p className="text-lg font-bold text-gray-600">
                          Mechanics
                        </p>
                        <p className="font-medium text-gray-500 text-md">
                          {feature.mechanics}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-4 mt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center p-6 border border-gray-400 rounded-md">
                        <GiProfit className="text-3xl text-gray-600" />
                      </div>
                      <div className="flex flex-col mb-3">
                        <p className="text-lg font-bold text-gray-600">
                          Benefit
                        </p>
                        <p className="font-medium text-gray-500 text-md">
                          {feature.benefit}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="register"
                    className="inline-block px-8 py-3 mt-6 font-medium text-center text-white bg-orange-600 border border-transparent rounded-md hover:bg-black-900"
                  >
                    Sign up Free
                  </Link>
                </div>

                {/* Image Grid */}
                <div className={`mt-10 lg:w-1/2 px-4 relative`}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    </>
  );
};

export default Features;
