import Images from "Images";
import React from "react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  const signUpNavigate = () => {
    window.location.href = "/register";
  };

  return <Content signUpNavigate={signUpNavigate} />;
};

const Content = ({ signUpNavigate }) => {
  return (
    <div className="relative p-10">
      {/* Background Gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid w-full grid-cols-2 m-auto h-max -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-orange-500 to-orange-400 dark:from-orange-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-orange-400 to-orange-600 dark:to-orange-600"></div>
      </div>

      <div className="px-6 mx-auto max-w-7xl md:px-12 xl:px-6">
        <div className="relative">
          {/* User Images */}
          {/* <div className="flex items-center justify-center -space-x-2">
            <img
              loading="lazy"
              width="400"
              height="400"
              src={Images.sms}
              alt="member photo_one"
              className="object-cover w-8 h-8 rounded-full"
            />
            <img
              loading="lazy"
              width="200"
              height="200"
              src={Images.email}
              alt="member photo_two"
              className="object-cover w-12 h-12 rounded-full"
            />
            <img
              loading="lazy"
              width="200"
              height="200"
              src={Images.social_media}
              alt="member photo_three"
              className="z-10 object-cover w-16 h-16 rounded-full"
            />
            <img
              loading="lazy"
              width="200"
              height="200"
              src={Images.analytics}
              alt="member photo_four"
              className="relative object-cover w-12 h-12 rounded-full"
            />
            <img
              loading="lazy"
              width="200"
              height="200"
              src={Images.survey}
              alt="member photo_five"
              className="object-cover w-8 h-8 rounded-full"
            />
          </div> */}

          {/* Text Content */}
          <div className="m-auto mt-6 space-y-6 md:w-8/12 lg:w-7/12">
            <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white md:text-5xl">
              Get Started now
            </h1>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300">
              Be part of millions of people around the world using the campaign
              manager platform in modern User Business Setups.
            </p>
            {/* Get Started Button */}
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/register"
                className="relative flex h-12 w-full items-center decoration=none justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-orange-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-base font-semibold text-white dark:text-dark">
                  Get Started
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
